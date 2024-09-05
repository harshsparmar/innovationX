const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
});

const sendResetEmail = (email, resetToken) => {
  const resetLink = `http://localhost:3000/reset-password/${resetToken}`; // Adjust URL as needed

  const mailOptions = {
    from: "no-reply@example.com",
    to: email,
    subject: "Password Reset",
    text: `Click the link to reset your password: ${resetLink}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
