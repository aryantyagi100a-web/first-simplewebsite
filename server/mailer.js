import nodemailer from "nodemailer";

// Active only when both Gmail env vars are set; otherwise a no-op.
// Email failure never blocks a submission from being saved.
export function makeNotifier() {
  const { GMAIL_USER, GMAIL_APP_PASSWORD, NOTIFY_EMAIL } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return async () => false; // email not configured — submissions still save
  }

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD.replace(/\s+/g, ""),
    },
    pool: true,
  });

  const to = NOTIFY_EMAIL || GMAIL_USER;

  return async function notify({ name, email, phone, message }) {
    try {
      await transport.sendMail({
        from: `"Portfolio" <${GMAIL_USER}>`,
        to,
        replyTo: email || undefined,
        subject: `New website inquiry — ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email || "—"}`,
          `Phone: ${phone || "—"}`,
          "",
          message,
          "",
          "— sent from your portfolio contact form",
        ].join("\n"),
      });
      return true;
    } catch (err) {
      console.error("[mailer] send failed:", err.message);
      return false;
    }
  };
}
