const nodemailer = require("nodemailer");

function apiResponse(res, success, code, message, data = null, status = 200) {
  return res.status(status).json({ success, code, message, data });
}

function capitalizeFullName(name) {
  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function sendResetEmail(toEmail, resetToken) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: `"Suporte - Reumx" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "Redefinição de senha",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px;">
        <h2>Redefinição de senha</h2>
        <p>Clique no botão abaixo para criar uma nova senha:</p>
        <a href="${resetLink}"
           style="display:inline-block;background:#007bff;color:#fff;padding:10px 20px;
           border-radius:5px;text-decoration:none;">
          Redefinir senha
        </a>
        <p style="margin-top:20px;">Este link expira em 15 minutos.</p>
      </div>
    `
  });
}

function isAtLeast18(birthdate) {
  const today = new Date();
  const birth = new Date(birthdate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  // Se ainda não fez aniversário este ano
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age >= 18;
}

module.exports = { apiResponse, capitalizeFullName, isValidEmail, sendResetEmail, isAtLeast18 };