const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 1025,
  secure: false,
});

const sendResetEmail = (email, resetToken) => {
  const resetLink = `http://localhost:3000/reset-password/${resetToken}`; 

  const mailOptions = {
    from: "no-reply@example.com",
    to: email,
    subject: "Password Reset",
    html: `Click <a href=${resetLink}>Here</a> to reset your password.`,

  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
