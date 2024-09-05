import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { requestResetPassword } from '../utils/ApiRoutes'; // Make sure to update this with the correct API route

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!email) {
            toast.warn("Please enter your email address");
            setLoading(false);
            return;
        }

        try {
            // Send request to reset password
            const response = await axios.post(requestResetPassword, { email });
            
            if (response.data.success) {
                toast.success("Password reset link has been sent to your email");
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="request-reset-container w-[35rem] mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="email" className='text-xl font-[600] opacity-70'>Email Address *</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='py-2 px-3 w-full bg-gray-100 border border-gray-300 rounded'
                    placeholder='Enter Your Email Address'
                    autoComplete="on"
                />
                <button
                    type="submit"
                    className='bg-blue-600 py-2 px-4 rounded text-white text-xl hover:bg-blue-700 disabled:opacity-50'
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default ForgotPassword;
