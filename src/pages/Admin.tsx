import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PillButton, WhatsAppIcon } from "../components/ui";
import { ArrowLeft, Mail, LogOut } from "lucide-react";

type Message = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  notified: 0 | 1;
  created_at: string;
};

const STORE_KEY = "admin_pw";

// SQLite stores UTC "YYYY-MM-DD HH:MM:SS" — make that explicit before parsing.
function formatDate(sql: string) {
  const d = new Date(sql.replace(" ", "T") + "Z");
  if (Number.isNaN(d.getTime())) return sql;
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState<boolean | null>(null); // null = checking
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/messages", { headers: { "x-admin-password": pw } });
      if (res.status === 401) {
        sessionStorage.removeItem(STORE_KEY);
        setAuthed(false);
        setError("wrong password");
        return false;
      }
      const json = await res.json();
      setMessages(json.messages ?? []);
      setAuthed(true);
      return true;
    } catch {
      setError("couldn't reach the server — is `npm run dev` running?");
      setAuthed(false);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Don't index the admin page; restore session if the tab is still open.
  useEffect(() => {
    document.title = "admin — messages";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
      document.title = "freelancer";
    };
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORE_KEY);
    if (saved) load(saved);
    else setAuthed(false);
  }, [load]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    const ok = await load(password.trim());
    if (ok) sessionStorage.setItem(STORE_KEY, password.trim());
  }

  function logout() {
    sessionStorage.removeItem(STORE_KEY);
    setAuthed(false);
    setPassword("");
    setMessages([]);
  }

  if (authed === null) {
    return <div className="min-h-screen bg-ink text-mute font-mono text-sm p-10 flex items-center justify-center">checking…</div>;
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-ink text-paper flex items-center justify-center px-4 py-8">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-line bg-surface/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
          <p className="font-mono text-xs sm:text-[13px] text-faint">[ admin ]</p>
          <h1 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight lowercase">enter the password</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin password"
            autoFocus
            className="mt-5 w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-base text-paper outline-none transition focus:border-white/35"
          />
          {error && (
            <p role="alert" className="mt-3 font-mono text-xs text-err">
              {error}
            </p>
          )}
          <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <PillButton type="submit" disabled={loading} className="w-full sm:w-auto min-h-[44px]">
              {loading ? "checking…" : "unlock"}
            </PillButton>
            <Link to="/" className="inline-flex min-h-[44px] items-center justify-center font-mono text-xs sm:text-[13px] text-mute hover:text-paper transition-colors">
              ← back to site
            </Link>
          </div>
          <p className="mt-6 font-mono text-[11px] leading-relaxed text-faint">
            set with ADMIN_PASSWORD in the .env file — see .env.example
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-paper px-4 sm:px-8 py-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="font-mono text-xs sm:text-[13px] text-faint">[ admin ]</p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight lowercase">
              {messages.length} {messages.length === 1 ? "lead / message" : "leads & messages"}
            </h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={logout}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-line bg-surface/50 px-3.5 py-2 font-mono text-xs text-mute hover:text-paper hover:bg-raised transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>log out</span>
            </button>
            <Link
              to="/"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-paper px-4 py-2 font-mono text-xs font-semibold text-ink hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>view site</span>
            </Link>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="mt-16 text-center rounded-2xl border border-dashed border-line p-10">
            <p className="font-mono text-sm text-faint">no messages yet — they'll show up here the moment someone submits the contact form.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl border border-line bg-surface/70 backdrop-blur-md p-5 sm:p-6 transition-all hover:border-white/30"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-line/60 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-base sm:text-lg font-bold text-paper capitalize">{m.name}</span>
                    <span className="font-mono text-[11px] text-faint bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10">
                      #{m.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs text-faint">
                    <span>{formatDate(m.created_at)}</span>
                    <span>·</span>
                    <span className={m.notified ? "text-live" : "text-faint"}>
                      {m.notified ? "✓ emailed" : "saved to db"}
                    </span>
                  </div>
                </div>

                <p className="whitespace-pre-wrap text-sm sm:text-[15px] leading-relaxed text-paper/95 bg-black/30 p-4 rounded-xl border border-white/10">
                  {m.message}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 pt-1">
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      className="inline-flex min-h-[38px] items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2 font-mono text-xs text-mute hover:text-paper hover:bg-raised transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-faint" />
                      <span>{m.email}</span>
                    </a>
                  )}
                  {m.phone && (
                    <a
                      href={`https://wa.me/${m.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[38px] items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2 font-mono text-xs text-mute hover:text-paper hover:bg-raised transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{m.phone} (WhatsApp)</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
