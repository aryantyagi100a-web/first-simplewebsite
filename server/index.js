import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import db from "./db.js";
import { makeNotifier } from "./mailer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
// Some hosts inject PORT=0 or empty — only trust a usable value, else default 3001.
const parsedPort = Number(process.env.PORT);
const PORT = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 3001;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const notify = makeNotifier();

app.use(express.json({ limit: "20kb" })); // contact payloads are small

// --- Very light in-memory rate limit: 5 submissions per hour per IP ---
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) {
    // crude memory cleanup so the Map can't grow forever
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return list.length > 5;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const trim = (v) => (typeof v === "string" ? v.trim().slice(0, 2000) : "");

function validate(body) {
  const name = trim(body.name);
  const email = trim(body.email);
  const phone = trim(body.phone);
  const message = trim(body.message);
  const company = trim(body.company); // honeypot — bots fill hidden fields

  const errors = {};
  if (!name || name.length < 2) errors.name = "please tell me your name";
  if (!message || message.length < 10)
    errors.message = "a few words about your project help a lot";
  if (message.length > 2000) errors.message = "message is too long";
  if (!email && !phone) errors.contact = "add an email or phone so i can reply";
  if (email && !EMAIL_RE.test(email)) errors.email = "that email doesn't look right";

  return { name, email, phone, message, company, errors };
}

app.post("/api/contact", async (req, res) => {
  const ip = req.ip || "unknown";

  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: "too many messages — try again later" });
  }

  const { name, email, phone, message, company, errors } = validate(req.body || {});

  // Honeypot filled → almost certainly a bot: pretend success, save nothing.
  if (company) return res.json({ ok: true });

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  let notified = 0;
  try {
    notified = (await notify({ name, email, phone, message })) ? 1 : 0;
  } catch (err) {
    console.error("[contact] notify threw:", err.message);
  }

  const info = db
    .prepare(
      `INSERT INTO messages (name, email, phone, message, ip, notified)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(name, email || null, phone || null, message, ip, notified);

  console.log(`[contact] saved #${info.lastInsertRowid} from ${name}${notified ? " (emailed)" : ""}`);
  res.json({ ok: true });
});

// --- Read submissions: requires the admin password header ---
// (kept after the routes that don't need it; Express matches in order)
function requireAdmin(req, res, next) {
  const provided = req.get("x-admin-password") || "";
  if (!ADMIN_PASSWORD || provided !== ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }
  next();
}

app.get("/api/messages", requireAdmin, (_req, res) => {
  const rows = db
    .prepare(`SELECT id, name, email, phone, message, notified, created_at FROM messages ORDER BY id DESC LIMIT 500`)
    .all();
  res.json({ ok: true, messages: rows });
});

// --- In production, serve the built frontend from this same server ---
const distDir = path.join(__dirname, "..", "dist");
app.use(express.static(distDir));

// SPA fallback for client-side routes like /admin
app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(PORT, () => {
  const mailOn = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD;
  console.log(`API ready on http://localhost:${PORT} (email notifications: ${mailOn ? "ON" : "off"})`);
});
