// backend/services/emailService.js
const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, html }) {
  // dev: if SMTP creds missing, use Ethereal test account
  if (!process.env.SMTP_HOST) {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: { user: testAccount.user, pass: testAccount.pass }
    });
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to, subject, html
    });
    console.log('Ethereal preview URL:', nodemailer.getTestMessageUrl(info));
    return info;
  }

  // production/dev with provided SMTP
    const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // important for port 587 with STARTTLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
    });

}

module.exports = sendEmail;
