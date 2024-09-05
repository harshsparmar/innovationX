// components/ResetPasswordForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { resetPassword } from '../utils/ApiRoutes';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const {token} = useParams();

  const toggleShow = () => setShowPass(!showPass);
  const toggleShowConfirm = () => setShowConfirmPass(!showConfirmPass);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post(resetPassword, { token, newPassword: password });
      alert("Password has been reset successfully");
    } catch (error) {
      console.error("Error resetting password", error);
    }
  };

  return (
    <div  className=" flex justify-center items-center flex-col ">
      <label>Change Password</label>

      <form onSubmit={handleSubmit}>
      {/* New Password Field */}
      <div className="password-field flex items-center">
        <input
          type={showPass ? "text" : "password"}
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-1 px-3 w-full bg-white border rounded"
        />
        <button
          type="button"
          onClick={toggleShow}
          className="show_button bg-white py-1 px-2 rounded-br-md rounded-tr-md "
        >
          {showPass ? (
            <VisibilityOffIcon className="text-black" />
          ) : (
            <VisibilityIcon className="text-black" />
          )}
        </button>
      </div>

      {/* Confirm Password Field */}
      <div className="confirm-password-field flex items-center mt-4">
        <input
          type={showConfirmPass ? "text" : "password"}
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="py-1 px-3 w-full bg-white border rounded"
        />
        <button
          type="button"
          onClick={toggleShowConfirm}
          className="show_button bg-white py-1 px-2 rounded-br-md rounded-tr-md "
        >
          {showConfirmPass ? (
            <VisibilityOffIcon className="text-black" />
          ) : (
            <VisibilityIcon className="text-black" />
          )}
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Reset Password
      </button>
    </form>
    </div>
  );
};


export default ResetPasswordForm;
