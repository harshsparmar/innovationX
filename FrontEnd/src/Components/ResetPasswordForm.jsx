// components/ResetPasswordForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { resetPassword } from '../utils/ApiRoutes';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(resetPassword, { token, newPassword: password });
      alert("Password has been reset successfully");
    } catch (error) {
      console.error("Error resetting password", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPasswordForm;
