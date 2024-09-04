import React, { useState } from 'react'
// we need component and css 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// circular progress
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// axios for fetching api
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signUpStudent } from '../utils/ApiRoutes'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Signup = () => {

    const navigate = useNavigate();
    const [student, setStudent] = useState({ name: "", email: "", password: "", cpassword: "" });

    // state for loading to upload picture of user
    const [loading, setLoading] = useState(false);

    // toggle password value show/hide
    const [showPass, setShowPass] = useState(false);
    const toggleShow = (e) => {
        e.preventDefault();
        setShowPass(!showPass);
    }


    // when clicked to sign up then handle
    const handleSignup = async (e) => {

        e.preventDefault();
        // set loading is true
        setLoading(true);

        // check all is valid  or not
        if (!student.name || !student.email || !student.password || !student.cpassword || !student.college || !student.username || !student.phoneno ) {
            toast.warn("Please Fill All Fields");
            setLoading(false);
            return;
        }

        // check password === cpassword
        if (student.password !== student.cpassword) {
            toast.warn("Password should be same");
            setLoading(false);
            return;
        }

        try {
            // signup student
            const data = await axios.post(signUpStudent, {
                name: student.name,
                email: student.email,
                password: student.password,
            })

            if (data.data.success === true) {
                localStorage.setItem("studentId", data.data.student_id);
                toast.success("Registration is successfull");
                navigate('/profile');
                setLoading(false);
            }
            else toast.error(data.data.msg);
            setLoading(false);
            //  if successfully done
            // goto /profile to complete their profile
        }
        catch (error) {
            console.log(error);
            toast.error("Internal server error");
            setLoading(false);
        }
    }


    const handleInputChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    }
    return (
        <>
            {/*👉 CREATE ACCOUNT FOROM */}

            <form action="" className="create_form mt-[-10px] w-[35rem] h-[495px] px-16 flex flex-col gap-5 py-9 bg-white rounded-xl shadow-lg" >

               <div  className="flex flex-row gap-2">

                 {/* for input name */}
                 <div className="name_box flex flex-col gap-2">
                    <label htmlFor="create_input_name" className='text-md  font-[600] '>Name<span className='text-red-600'>*</span></label>
                    <input
                        value={student.name}
                        onChange={(e) => handleInputChange(e)} // set value when change
                        type="text" name="name" id="create_input_name" className='py-1 px-3 w-full bg-white border rounded' placeholder='Enter Your  Full-name' />
                </div>
                    {/* username */}
                <div className="username_box flex flex-col gap-2">
                    <label htmlFor="create_input_username" className='text-md  font-[600] '>Username<span className='text-red-600'>*</span></label>
                    <input
                        value={student.username}
                        onChange={(e) => handleInputChange(e)} // set value when change
                        type="text" name="username" id="create_input_username" className='py-1 px-3 w-full bg-white border rounded' placeholder='Create Username' autoComplete="on" />
                </div>
               
               </div>
               <div   className="flex flex-row gap-2">

                {/* for input type email */}
                <div className="email_box flex flex-col gap-2">
                    <label htmlFor="create_input_email" className='text-md  font-[600] '>Email<span className='text-red-600'>*</span></label>
                    <input
                        value={student.email}
                        onChange={(e) => handleInputChange(e)} // set value when change
                        type="email" name="email" id="create_input_email" className='py-1 px-3 w-full bg-white border rounded' placeholder='Enter Your Email' autoComplete="on" />
                </div>

                        {/* Mobile Number */}
                <div className="number_box flex flex-col gap-2">
                    <label htmlFor="create_input_number" className='text-md  font-[600] '>Mobile No.<span className='text-red-600'>*</span></label>
                    <input
                        value={student.phoneno}
                        onChange={(e) => handleInputChange(e)} // set value when change
                        type="text" name="phoneno" id="create_input_number" className='py-1 px-3 w-full bg-white border rounded' placeholder='Enter Your Mobile no.' autoComplete="on" />
                </div>
               </div>
               <div   className="flex flex-row gap-2">

                  {/* for input type password */}
                  <div className="password_box flex flex-col gap-2">
                    <label htmlFor="create_input_password" className='text-md  font-[600] '>Password<span className='text-red-600'>*</span></label>
                    <div className="password flex items-center ">
                        <input
                            value={student.password}
                            onChange={(e) => handleInputChange(e)} // set value when change
                            type={showPass ? 'text' : 'password'} name="password" id="create_input_password" className='py-1 px-3 w-full bg-white border rounded' placeholder='Enter Password' autoComplete="new-password" />
                        <button tabIndex="-1" onClick={toggleShow} className="show_button bg-white py-1 px-2 rounded-br-md rounded-tr-md ">
                            {showPass ? (
                                <VisibilityOffIcon className="text-black" />
                            )
                                : (
                                    <VisibilityIcon className="text-black" />
                                )
                            }
                        </button>
                    </div>
                

                {/* for confirm input type password */}
                <div className="password_box flex flex-col gap-2">
                    <label htmlFor="create_input_cpassword" className='text-md  font-[600] '>Confirm Password<span className='text-red-600'>*</span></label>
                    <div className="password flex items-center ">
                        <input
                            value={student.cpassword}
                            onChange={(e) => handleInputChange(e)} // set value when change
                            type={showPass ? 'text' : 'password'} name="cpassword" id="create_input_cpassword" className='py-1 px-3 w-full bg-white border rounded' placeholder='Confirm Password' autoComplete="new-password" />
                        <button tabIndex="-1" onClick={toggleShow} className="show_button bg-white py-1 px-2 rounded-br-md rounded-tr-md ">
                            {showPass ? (
                                <VisibilityOffIcon className="text-black" />
                            )
                                : (
                                    <VisibilityIcon className="text-black" />
                                )
                            }
                        </button>
                    </div>
                </div>
                   </div>
               </div>
              <div  className="flex flex-row gap-2">

                 {/* college name */}
                 <div className="college_box flex flex-col gap-2" >
                 <label htmlFor="create_input_college" className='text-lg  font-[600] '>College<span className='text-red-600'>*</span></label>
                 <input
                        value={student.college}
                        onChange={(e) => handleInputChange(e)} // set value when change
                        type="text" name="college" id="create_input_college" className='py-1 px-3 w-full bg-white border rounded' placeholder='Enter College Name' autoComplete="on" />
                 </div>
                {/* upload your picture */}
                <div className="picture_box flex flex-col gap-2 ">
                    <label htmlFor="create_input_picture" className='text-md  font-[600] '>Upload Your Picture<span className='text-red-600'>*</span></label>
                    {/* only accept image */}
                    <input type="file" accept='image/*'
                        // input image handle by postDetail method

                        name="create_input_picture" id="create_input_picture" className='py-1 px-3 w-full h-10 bg-white border rounded' placeholder='Confirm Password' />
                </div>
              </div>

                {/* input button to create user */}
                <div className="button_box flex flex-col justify-center py-0 items-center gap-4">
                    <button
                        // signup button
                        onClick={handleSignup}
                        disabled={loading}
                        className='bg-[#151717] w-full py-[5px] rounded  text-white text-md hover:bg-black  '
                    >
                        {/* button content is changing to circluar progress when upload image */}
                        {loading ?
                            (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress color="inherit" size={28} />
                            </Box>
                            ) : ('Sign Up')}
                    </button>
                </div>

            </form>


            {/* the toastify alert is added here */}
            <ToastContainer />
        </>
    )
}

export default Signup
