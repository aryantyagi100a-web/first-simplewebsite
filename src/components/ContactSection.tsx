import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { site } from "../site.config";
import { BracketLabel, Magnetic, PillButton, WhatsAppIcon } from "./ui";

type Status = "idle" | "sending" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "phone" | "message" | "contact", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const company = String(data.get("company") || "").trim(); // honeypot

    // client-side validation
    const next: FieldErrors = {};
    if (name.length < 2) next.name = "please tell me your name";
    if (message.length < 10) next.message = "a few words about your project help a lot";
    if (email && !EMAIL_RE.test(email)) next.email = "that email doesn't look right";
    if (!email && !phone) next.contact = "add an email or phone so i can reply";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, company }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (res.status === 400 && json.errors) {
        setErrors(json.errors);
        setStatus("idle");
        return;
      }
      setServerError(json.error || "something went wrong — try whatsapp instead");
      setStatus("error");
    } catch {
      setServerError("couldn't reach the server — check your connection, or use whatsapp");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-[5px] px-6 sm:px-10 lg:px-16 py-24 sm:py-28">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-xs sm:text-[13px] text-faint">[ contact ]</p>
        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight lowercase text-paper">
          tell me about your business
        </h2>
        <p className="mt-4 max-w-xl text-base text-mute leading-relaxed font-normal">
          a rough idea is enough — i'll reply with what i'd suggest and what it would cost. {site.heroNote}.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          {/* ---------------- form ---------------- */}
          <div>
            {status === "success" ? (
              <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
                <p className="font-mono text-[13px] text-live">[ message sent ]</p>
                <p className="mt-4 text-2xl font-semibold tracking-tight lowercase">
                  got it — thanks!
                </p>
                <p className="mt-3 text-mute leading-relaxed">
                  i'll get back to you {site.heroNote}. in a hurry? whatsapp is faster.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Magnetic className="inline-block">
                    <PillButton type="button" onClick={() => setStatus("idle")}>
                      send another message
                    </PillButton>
                  </Magnetic>
                  <BracketLabel
                    as="a"
                    href={site.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mute hover:text-paper transition-colors self-center"
                  >
                    whatsapp me instead
                  </BracketLabel>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* honeypot — hidden from humans, catnip for bots */}
                <div className="hp-field" aria-hidden="true">
                  <label>
                    company
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="your name" htmlFor="cf-name" error={errors.name}>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="priya sharma"
                      className={inputCls(!!errors.name)}
                    />
                  </Field>
                  <Field label="phone (optional)" htmlFor="cf-phone" error={errors.phone}>
                    <input
                      id="cf-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      className={inputCls(!!errors.phone)}
                    />
                  </Field>
                </div>

                <Field label="email" htmlFor="cf-email" error={errors.email}>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@business.com"
                    className={inputCls(!!errors.email)}
                  />
                </Field>
                {errors.contact && <ErrorText>{errors.contact}</ErrorText>}

                <Field label="your project" htmlFor="cf-message" error={errors.message}>
                  <textarea
                    id="cf-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="what's your business, and what do you need the website to do?"
                    className={`${inputCls(!!errors.message)} resize-y min-h-[120px]`}
                  />
                </Field>

                {status === "error" && (
                  <p role="alert" className="rounded-xl border border-err/30 bg-err/10 px-4 py-3 text-sm text-err">
                    {serverError}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Magnetic className="inline-block">
                    <PillButton type="submit" disabled={status === "sending"}>
                      {status === "sending" ? "sending…" : "send message"}
                    </PillButton>
                  </Magnetic>
                  <span className="font-mono text-xs text-faint">replies {site.heroNote}</span>
                </div>
              </form>
            )}
          </div>

          {/* ---------------- direct links ---------------- */}
          <aside className="lg:pl-8 lg:border-l lg:border-line">
            <p className="font-mono text-[13px] text-faint">[ prefer to talk directly? ]</p>
            <div className="mt-6 space-y-3">
              <DirectLink
                href={site.whatsappLink}
                icon={<WhatsAppIcon className="h-5 w-5" />}
                title="whatsapp"
                sub={site.whatsappDisplay}
              />
              <DirectLink
                href={`mailto:${site.email}`}
                icon={<MailGlyph />}
                title="email"
                sub={site.email}
              />
              <DirectLink
                href={site.fiverrUrl}
                icon={<FiverrGlyph />}
                title="fiverr"
                sub={`order through @${site.fiverrHandle}`}
                external
              />
            </div>
            <p className="mt-8 text-sm text-mute leading-relaxed">
              messages usually get a reply the same day. for quotes, whatsapp is fastest — a photo of your shop
              or a line about your work is a great start.
            </p>
          </aside>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- small internals ---------------- */

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border bg-surface px-4 py-3 text-[15px] text-paper placeholder:text-faint outline-none transition focus:border-white/25 ${
    hasError ? "border-err/60" : "border-line"
  }`;
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block font-mono text-xs text-mute">
        {label}
      </label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-2 font-mono text-xs text-err">
      {children}
    </p>
  );
}

function DirectLink({
  href,
  icon,
  title,
  sub,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  external?: boolean;
}) {
  return (
    <Magnetic className="block w-full" strength={0.12} maxShift={4}>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4 transition hover:border-white/20 hover:bg-raised"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-paper">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold lowercase">{title}</span>
          <span className="block truncate font-mono text-xs text-mute">{sub}</span>
        </span>
      </a>
    </Magnetic>
  );
}

function MailGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FiverrGlyph() {
  return <span className="text-lg font-bold leading-none" aria-hidden>fi</span>;
}
