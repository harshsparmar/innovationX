const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Student = require("../models/studentModel"); // Import the Student model
const { sendResetEmail } = require("../utils/mailer");

class ForgetPasswordController {
  // Request password reset
  static async requestResetPassword(req, res) {
    const { email } = req.body;

    try {
      const student = await Student.findOne({ email });
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      const tokenExpiry = Date.now() + 3600000; // 1 hour

      student.resetPasswordToken = resetToken;
      student.resetPasswordExpires = tokenExpiry;
      await student.save();

      await sendResetEmail(student.email, resetToken);

      res.json({ message: "Password reset email sent" });
    } catch (error) {
      res.status(500).json({ message: "Error requesting password reset", error });
    }
  }

  // Reset password
  static async resetPassword(req, res) {
    const { token, newPassword } = req.body;

    try {
      const student = await Student.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!student) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(newPassword, salt);
      student.resetPasswordToken = undefined;
      student.resetPasswordExpires = undefined;
      await student.save();

      res.json({ message: "Password has been reset successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error resetting password", error });
    }
  }
}

module.exports = ForgetPasswordController;
