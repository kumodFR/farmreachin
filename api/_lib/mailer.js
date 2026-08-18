/* Provider adapter. Swapping email services means editing THIS file only —
   the handler and the Contact page never see provider details.

   Configured entirely through server-side environment variables:
     MAIL_PROVIDER      resend | smtp | console   (default: resend if key set)
     MAIL_FROM          e.g. "Farmreach <website@farmreach.in>"
     RESEND_API_KEY     when provider = resend
     SMTP_URL           when provider = smtp, e.g. smtps://user:pass@host:465
   None of these are VITE_ prefixed, so none reach the browser bundle. */

const env = (typeof process !== 'undefined' && process.env) || {};

function provider() {
  if (env.MAIL_PROVIDER) return env.MAIL_PROVIDER;
  if (env.RESEND_API_KEY) return 'resend';
  if (env.SMTP_URL) return 'smtp';
  return 'console';
}

export function mailerConfigured() {
  return provider() !== 'console';
}

async function sendViaResend(message) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: message.from,
      to: message.to,
      cc: message.cc,
      reply_to: message.replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text
    })
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
  return res.json();
}

async function sendViaSmtp(message) {
  const { createTransport } = await import('nodemailer');
  const transport = createTransport(env.SMTP_URL);
  return transport.sendMail({
    from: message.from,
    to: message.to,
    cc: message.cc,
    replyTo: message.replyTo,
    subject: message.subject,
    html: message.html,
    text: message.text
  });
}

/* message: { to, cc?, replyTo?, subject, html, text } */
export async function sendMail(message) {
  const payload = { from: env.MAIL_FROM || 'Farmreach <website@farmreach.in>', ...message };
  switch (provider()) {
    case 'resend':
      return sendViaResend(payload);
    case 'smtp':
      return sendViaSmtp(payload);
    default:
      /* No provider configured: log to the server only, never to the client. */
      console.log('[contact] mail not sent — no provider configured:', payload.subject);
      return { skipped: true };
  }
}
