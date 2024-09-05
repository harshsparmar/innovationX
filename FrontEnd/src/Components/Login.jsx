import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logInStudent } from '../utils/ApiRoutes';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const toggleShow = (event) => {
        event.preventDefault();
        setShowPass(!showPass);
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!email || !password) {
            toast.warn("Please fill All Inputs");
            setLoading(false);
            return;
        }
        try {
            const data = await axios.post(logInStudent, { email, password });
            if (data.data.success === true) {
                toast.success("Successfully Login");
                localStorage.setItem("studentId", data.data.student_id);
                navigate("/profile");
            } else {
                toast.error(data.data.msg);
            }
            setLoading(false);
        } catch (error) {
            toast.error("Invalid User");
            setLoading(false);
        }
    }

    return (
        <>
           
           <form action="" className="create_form mt-[-10px] w-[30rem] h-[400px] px-16 flex flex-col gap-5 py-9 bg-white rounded-xl shadow-lg" >
                <div className="email_box flex flex-col gap-1 text-black mt-[-20px]">
                    <label htmlFor="login_input_email" className='text-xl font-[500]'><span className='text-black'>Email<span className='text-red-800'>*</span></span></label>
                  
                   <div className='flex items-center'>
                   <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'>
<path d="M12.1992 12C14.9606 12 17.1992 9.76142 17.1992 7C17.1992 4.23858 14.9606 2 12.1992 2C9.43779 2 7.19922 4.23858 7.19922 7C7.19922 9.76142 9.43779 12 12.1992 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="M3 22C3.57038 20.0332 4.74796 18.2971 6.3644 17.0399C7.98083 15.7827 9.95335 15.0687 12 15C16.12 15 19.63 17.91 21 22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
 </svg> 
                   <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" name="login_input_email" id="login_input_email" className='py-1 px-3 w-full bg-white border rounded-lg' placeholder='Enter Your Email or username' autoComplete="on" />
                   </div>
                </div>
                <div className="password_box flex flex-col gap-2">
                    <label htmlFor="login_input_password" className='text-xl  font-[500]'>Password<span className='text-red-800'>*</span></label>
                    <div className="password flex items-center ">
                    <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            viewBox="-64 0 512 512"
            height="22"
            className='mr-2'
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
          </svg> <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPass ? 'text' : 'password'} name="login_input_password" id="login_input_password" className='py-1 px-3 w-full border rounded-lg bg-white' placeholder='Enter Password' autoComplete="new-password" ></input>
                        <button tabIndex="-1" onClick={toggleShow} className="show_button bg-white py-1 px-2 rounded-br-md rounded-tr-md ">
                            {showPass ? (
                                <VisibilityOffIcon className="text-black " />
                            )
                                : (
                                    <VisibilityIcon className="text-black " />
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className="links flex flex-row items-end justify-between mt-4">
                        <Link to="/forgot-password" className='text-blue-500 hover:underline'>Forgot Password?</Link>
                        <Link to="/forgot-username" className='text-blue-500 hover:underline'>Forgot Username?</Link>
                    </div>
                <div className="button_box flex flex-col justify-center py-4 items-center gap-4">
                    <button
                        onClick={handleLogin}
                        className='bg-[#151717] w-full py-[5px] rounded-xl  text-white text-xl hover:bg-black text-opacity-90 ' >
                        {loading ?
                            (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress color="inherit" size={28} />
                            </Box>
                            ) : ('Login')}
                    </button>
                    
                  </div>
                
            </form>
           

            <ToastContainer />
        </>
    )
}

export default Login;
