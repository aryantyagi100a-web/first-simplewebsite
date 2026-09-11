import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PillButton } from "../components/ui";

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
    return <div className="min-h-screen bg-ink text-mute font-mono text-sm p-10">checking…</div>;
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-ink text-paper flex items-center justify-center px-5">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <p className="font-mono text-[13px] text-faint">[ admin ]</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight lowercase">enter the password</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin password"
            autoFocus
            className="mt-6 w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] outline-none transition focus:border-white/25"
          />
          {error && (
            <p role="alert" className="mt-3 font-mono text-xs text-err">
              {error}
            </p>
          )}
          <div className="mt-5 flex items-center gap-4">
            <PillButton type="submit" disabled={loading}>
              {loading ? "checking…" : "unlock"}
            </PillButton>
            <Link to="/" className="font-mono text-[13px] text-mute hover:text-paper transition-colors">
              ← back to site
            </Link>
          </div>
          <p className="mt-8 font-mono text-[11px] leading-relaxed text-faint">
            set with ADMIN_PASSWORD in the .env file — see .env.example
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-paper px-5 sm:px-8 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[13px] text-faint">[ admin ]</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight lowercase">
              {messages.length} {messages.length === 1 ? "message" : "messages"}
            </h1>
          </div>
          <div className="flex items-center gap-5">
            <button onClick={logout} className="font-mono text-[13px] text-mute hover:text-paper transition-colors">
              log out
            </button>
            <Link to="/" className="font-mono text-[13px] text-mute hover:text-paper transition-colors">
              view site →
            </Link>
          </div>
        </div>

        {messages.length === 0 ? (
          <p className="mt-16 font-mono text-sm text-faint">no messages yet — they'll show up here the moment the form is used.</p>
        ) : (
          <ul className="mt-10 border-t border-line">
            {messages.map((m) => (
              <li key={m.id} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <div className="space-y-1.5">
                  <p className="font-mono text-xs text-faint">{formatDate(m.created_at)}</p>
                  <p className="text-sm font-semibold">{m.name}</p>
                  {m.email && (
                    <a href={`mailto:${m.email}`} className="block truncate font-mono text-xs text-mute hover:text-paper">
                      {m.email}
                    </a>
                  )}
                  {m.phone && (
                    <a href={`https://wa.me/${m.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="block font-mono text-xs text-mute hover:text-paper">
                      {m.phone}
                    </a>
                  )}
                  <p className="font-mono text-[10px] text-faint">
                    {m.notified ? "✓ emailed to you" : "saved only (email off or failed)"}
                  </p>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-paper/90">{m.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
