# freelancer — portfolio

A single-page portfolio with a working contact form, built to win over business owners: dark, typographic, fast. The form submissions persist to SQLite, and you can read them at `/admin`.

**Stack:** React + Vite + TypeScript + Tailwind v4 + Framer Motion (frontend) · Node + Express + better-sqlite3 + Nodemailer (backend). No other runtime dependencies.

## Quick start

```bash
npm install
npm run dev
```

This starts two things together:

- the API on **http://localhost:3001**
- the frontend on **http://localhost:5173** (Vite proxies `/api` to the API)

Open http://localhost:5173 — the contact form already works and saves to the database.

## Production

```bash
npm start
```

Builds the frontend and serves everything (site + API) from one port: **http://localhost:3001**.

## Setup (2 required steps)

### 1. Set your admin password

```bash
cp .env.example .env
```

Then edit `.env` and set:

```
ADMIN_PASSWORD=a-long-password-you-remember
```

You'll use it at **http://localhost:5173/admin** (or `:3001/admin` in production) to read messages.

### 2. (Optional) Get emailed on every submission

Emails are sent via Gmail when both variables are set in `.env` (otherwise submissions just save to the DB — the site works either way):

```
GMAIL_USER=you@gmail.com
GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
```

The app password must be a Google **App Password** (requires 2-step verification on your Google account):

1. Go to https://myaccount.google.com/apppasswords
2. Create one (name it "portfolio"), copy the 16 characters
3. Paste it into `GMAIL_APP_PASSWORD` (with or without spaces — both work)

Notifications go to `NOTIFY_EMAIL` if set, otherwise to `GMAIL_USER` itself.

## Make the site yours

Everything personal lives in **one file**: [`src/site.config.ts`](src/site.config.ts). Replace the marked PLACEHOLDER values:

- `name`, `email`, `whatsapp` (+ `whatsappDisplay`), `fiverrUrl` (+ `fiverrHandle`), `location`
- hero copy, statement line, availability text
- the `services` list and `processSteps` — plain-language bullets, edit freely
- the `conceptProject` block (the salon demo)

Contact links, CTAs, the footer, and the admin page all read from that file.

## How it works

- **`POST /api/contact`** — validates name/message, requires email *or* phone, checks a hidden honeypot field, rate-limits to 5 submissions/hour/IP, saves to SQLite, then tries to email you (email failure never blocks saving).
- **`GET /api/messages`** — returns submissions only with the `x-admin-password` header matching `ADMIN_PASSWORD`.
- **Database** — `data/portfolio.db` (created automatically; gitignored). Delete the file to start fresh.
- **`/admin`** — password prompt (kept in sessionStorage for the tab session), lists every submission with contact links and whether the email went out.

## Project layout

```
server/            Express API (plain JS, no build step)
  index.js         endpoints + validation + static serving
  db.js            SQLite setup (data/portfolio.db)
  mailer.js        optional Gmail notifications
src/
  site.config.ts   ← YOUR name, links, copy — edit this
  components/      TopNav, Hero, ConceptShowcase, Services, Process, StatementBand, ContactSection, Footer
  pages/Admin.tsx  password-protected inbox
```
