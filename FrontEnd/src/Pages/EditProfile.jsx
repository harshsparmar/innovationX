import Navbar from '../Components/Navbar'
import React, { useEffect, useState } from 'react';
import '../CSS/Style.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import CloseIcon from '@mui/icons-material/Close';
import CustomSelection from '../Components/CustomInput/CustomSelection';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { upDateStudentImg, upDateStudentInfo } from '../utils/ApiRoutes'
// circular progress
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

const EditProfile = () => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [website, setWebsite] = useState("");
    const [linkdin, setLinkdin] = useState("");
    const [github, setGithub] = useState("");
    const [instagram, setInstagram] = useState("");
    const [email, setEmail] = useState("");
    const [college, setCollege] = useState("");
    const [course, setCourse] = useState("");
    const [passYear, setPassYear] = useState("");
    const [sem_year, setSem_Year] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [technology, setTechnology] = useState([]);
    const [programming, setProgramming] = useState([]);

    const [tech, setTech] = useState("");
    const [language, setLanguage] = useState("");
    // const [pic,setPic]=useState("");

    useEffect(() => {
        const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));
        setName(studentInfo.name)
        setBio(studentInfo.bio)
        setWebsite(studentInfo.link.website)
        setLinkdin(studentInfo.link.linkdin)
        setGithub(studentInfo.link.github)
        setInstagram(studentInfo.link.instagram)
        setEmail(studentInfo.email)
        setCollege(studentInfo.college)
        setCourse(studentInfo.course)
        setPassYear(studentInfo.passYear)
        setSem_Year(studentInfo.sem_year)
        setLocation(studentInfo.location)
        setImage(studentInfo.image)
        setTechnology(studentInfo.technology)
        setProgramming(studentInfo.programming)
    }, [])

    // state for loading to upload picture of user
    const [loading, setLoading] = useState(false);


    //✅👉 Post data of that state when clicked to save then it saved all indivisual above state 
    // eslint-disable-next-line

    const navigate = useNavigate();

    // Saved data if user clicked saved button
    const handleSaveEdit = async () => {
        setLoading(true);
        console.log(bio);
        const data = await axios.post(`${upDateStudentInfo}/${localStorage.getItem("studentId")}`, {
            name, bio, website, linkdin, github, instagram,
            email, college, course, passYear, sem_year, location,
            image, technology, programming
        })
        toast.success("Saved Successfully!");
        localStorage.removeItem("studentInfo");
        setTimeout(() => {
            navigate('/profile');
        }, 2000);
    }

    // handle cancel when edit (managing by main data)
    const handleCancelEdit = () => {
        localStorage.removeItem("studentInfo");
        navigate('/profile');
    }

    const handleImageChange = async (e) => { // not working
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("profileImg", e.target.files[0]);
            const data = await axios.post(`${upDateStudentImg}/${localStorage.getItem("studentId")}`, formData)
            if (data.data.success === true) {
                setImage(data.data.img_url);
                console.log(data.data.img_url)
                toast.success(data.data.msg);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Internal server error");
        }
    }
    const getImageDetails = async (pic) => { // pics is user entered image
        // when upload picture then load button
        setLoading(true); // when loading starts
        // if pics is undefined then popup error
        if (pic === undefined) {
            toast.warn("Please Select an Image");
            return; // no move forward
        }

        // if type is jpeg and png only then only upload
        if ((pic.type === "image/jpeg") || (pic.type === "image/png")) {

            // using formData of JS for sending post request to cloudinary api

            const picData = new FormData();

            // FormData JS object used for data format when sending body in HTTP requests, 
            // often used in web applications for tasks like file uploads.

            picData.append("file", pic);
            picData.append("upload_preset", "chat-app");
            picData.append("cloud_name", "hackethon-users-image");

            try {
                // desctructured data is giving all details about uploaded image
                const { data } = await axios.post("https://api.cloudinary.com/v1_1/hackethon-users-image/image/upload"
                    , picData) // send payLoad
                console.log(data);
                console.log(data.url);
                // Picture is setted
                setImage(data.url.toString());
                setLoading(false);
            }
            catch (error) {
                toast.error("Failed to upload image");
                setLoading(false);
            }

        } else {
            toast.warn("Please select image");
            setLoading(false);
            return;
        }
    }
    return (
        <>

            <div className="profle_container flex flex-col font-overpass p-2">

                <div className="heading_container flex  items-center justify-between px-20 py-3 m-3 bg-slate-100 rounded-lg">
                    <h1 className='profile_container_heading font-signika font-semibold text-gray-700 text-2xl ' >MY PROFILE SECTION</h1>
                    <div className="edit_profile_box flex gap-6 items-center justify-center">

                        {/* if user edit then show save and cancel button */}

                        <button className='edit_button custom-button '
                            onClick={handleSaveEdit}
                        >SAVE</button>
                        <button className='edit_button custom-button '
                            onClick={handleCancelEdit}
                        >CANCEL</button>

                    </div>
                </div>


                {/* user details strudents  */}
                <div className="user_details user_detail user_detail flex flex-wrap justify-center items-center px-0 gap-7 font-overpass h-full py-2 m-3shadow-gray-600 rounded-lg ">

                    {/* images name descr social links changed from 30vw */}
                    <div className="imp_show rounded-lg flex flex-col items-center h-[31rem] gap-6 px-2 bg-gray-200 py-2 w-[47.5%] min-w-[400px] shadow-lg">

                        {/* image name bio */}
                        <div className="top_details flex flex-col items-center gap-10 px-[0vw] p-6 ">

                            {/* image and name */}
                            <div className="name-and-image flex flex-col items-center gap-4  ">
                                <div className="image_box h-32 w-32">
                                    {/* button content is changing to circluar progress when upload image */}
                                    {loading ?
                                        (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <CircularProgress color="inherit" size={28} />
                                        </Box>
                                        ) : (
                                            <>
                                                <img src={image.length > 0 ? image : "./images/default.jpg"} alt="user" className='p-[0.15rem] transition-all duration-500 bg-slate-600 w-32 h-32 rounded-full cursor-pointer hover:bg-gray-600 shadow-md shadow-blue-400 overflow-hidden' />
                                                <input
                                                    accept='image/*'
                                                    // input image handle by getImageDetails method
                                                    onChange={(e) => getImageDetails(e.target.files[0])}
                                                    type="file"
                                                    id="profile_file" className='hidden ' />
                                                <label htmlFor="profile_file" className='relative top-[-1.6rem] left-4 py-1 px-1 cursor-pointer rounded-lg text-[0.9rem] text-white bg-slate-800 opacity-80' >Change Image</label>
                                            </>
                                        )}
                                </div>

                                <h2 className='text-2xl font-semibold opacity-90'>

                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        type="text" className='edit_profile_input_bg text-lg p-[3px] pl-2 font-normal rounded-lg w-64 border-[1px] mt-3 border-gray-400 focus:border-blue-600 placeholder:Enter Your Name' name="" value={name} id="" />
                                </h2>
                            </div>

                            {/* linlks of social media */}
                            <div className="social_links flex flex-col gap-3 w-full pl-[5px]">

                                {/* My Website link */}
                                <div className="website_link flex gap-3 text-2xl ">
                                    <LinkIcon className='text-2xl font-' />
                                    <input
                                        onChange={(e) => setWebsite(e.target.value)}
                                        type="text"
                                        className="  edit_profile_input_bg text-lg pl-2 placeholder:text-gray-800   font-normal rounded-lg  border-[1px] border-gray-400 focus:border-blue-600"
                                        placeholder="Your Website"
                                        name="website"
                                        value={website}
                                    />
                                </div>
                                {/* linkedin link */}
                                <div className="linkedin_link flex gap-3">
                                    <LinkedInIcon className='text-2xl' />
                                    <input
                                        onChange={(e) => setLinkdin(e.target.value)}
                                        type="text"
                                        className="  edit_profile_input_bg text-lg pl-2 placeholder:text-gray-800 font-normal rounded-lg  border-[1px] border-gray-400 focus:border-blue-600"
                                        placeholder="Linkedin Link"
                                        name="linkdin"
                                        value={linkdin}
                                    />
                                </div>
                                {/* github link */}
                                <div className="github_link flex gap-3">
                                    <GitHubIcon className='text-2xl' />
                                    <input
                                        onChange={(e) => setGithub(e.target.value)}
                                        type="text"
                                        className="  edit_profile_input_bg text-lg pl-2 placeholder:text-gray-800     font-normal rounded-lg  border-[1px] border-gray-400 focus:border-blue-600"
                                        placeholder="Github Link"
                                        name="github"
                                        value={github}
                                    />
                                </div>

                                {/* instagram link */}
                                <div className="instagram_link flex gap-3">
                                    <InstagramIcon className='text-2xl' />
                                    <input
                                        onChange={(e) => setInstagram(e.target.value)}
                                        type="text"
                                        className="  edit_profile_input_bg text-lg pl-2 placeholder:text-gray-800     font-normal rounded-lg  border-[1px] border-gray-400 focus:border-blue-600"
                                        placeholder="Instagram Link"
                                        name="instagram"
                                        value={instagram}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* <div className="background_info rounded-lg-lg flex flex-col bg-slate-100 w-[47.5%] items-center justify-center min-h-[27rem] pl-9 h-full pt-7 px-0 gap-3 text-xl min-w-[400px]"> */}
                    <div className="background_info rounded-lg flex flex-col items-center m-[5px] h-[31.5rem] gap-6 px-2 bg-gray-200 py-2 w-[48%] min-w-[400px] shadow-lg">

                        {/* basic details of User */}
                        <div className="basic_details flex rounded-lg flex-col w-full min-h-[31rem] justify-center items-center pt-7 px-0 gap-4 text-xl shadow-lg">

                            {/* email */}
                            <div className="user_email flex items-center gap-3">
                                <span className='small_heading text-black' >Email &nbsp; &nbsp; &nbsp; : </span>

                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className="   edit_profile_input_bg text-xl justify-start pl-2 placeholder:text-gray-800  w-[350px]   font-normal rounded-lg  border-[1px] border-gray-400 focus:border-blue-600"
                                    placeholder="Your Email"
                                    name="email"
                                    value={email}
                                />
                            </div>

                            {/* Collage */}
                            <div className="user_collge flex items-center  gap-3">
                                <span className='small_heading  text-black' >College  &nbsp; : </span>

                                <input
                                    onChange={(e) => setCollege(e.target.value)}
                                    type="text"
                                    className="  edit_profile_input_bg text-lg pl-2 placeholder:text-gray-800  w-[350px]   font-normal rounded-lg  border-[1px] border-gray-400 focus:border-blue-600"
                                    placeholder="Your College"
                                    name="college"
                                    value={college}
                                />
                            </div>

                            {/* Courses */}
                            <div className="user_course flex items-center  gap-3">
                                <span className='small_heading text-black' >Course &nbsp; &nbsp; : </span>


                                <input
                                    onChange={(e) => setCourse(e.target.value)}
                                    type="text"
                                    className="  edit_profile_input_bg text-lg pl-2 placeholder:text-gray-800  w-[350px]   font-normal rounded-lg  border-[1px] border-gray-400 focus:border-blue-600"
                                    placeholder="Your Course"
                                    name="course"
                                    value={course}
                                />
                            </div>

                            {/* Passout Year */}
                            <div className="user_pass_year flex items-center  gap-3">
                                <span className='small_heading text-black' >PassYear  &nbsp;: </span>


                                <input
                                    onChange={(e) => setPassYear(e.target.value)}
                                    type="text"
                                    className="  edit_profile_input_bg text-lg pl-2 placeholder:text-gray-800  w-[350px]   font-normal rounded-lg  border-[1px] border-gray-400 focus:border-blue-600"
                                    placeholder="Your PassYear"
                                    name="passYear"
                                    value={passYear}
                                />
                            </div>

                            {/* SEM/ YEAR */}
                            <div className="user_year_sem flex items-center  gap-3">
                                <span className='small_heading text-black' >Sem/Year :</span>

                                <input
                                    onChange={(e) => setSem_Year(e.target.value)}
                                    type="text"
                                    className="  edit_profile_input_bg text-lg pl-2 placeholder:text-gray-800  w-[350px]   font-normal rounded-lg  border-[1px] border-gray-400 focus:border-blue-600"
                                    placeholder="Your Sem/Year"
                                    name="sem_year"
                                    value={sem_year}
                                />
                            </div>

                            <div className="user_location flex items-center  gap-3">
                                <span className='small_heading text-black' >Location &nbsp;: </span>

                                <input
                                    onChange={(e) => setLocation(e.target.value)}
                                    type="text"
                                    className="  edit_profile_input_bg text-lg pl-2 placeholder:text-gray-800   w-[350px]  font-normal rounded-lg  border-[1px] border-gray-400 focus:border-blue-600"
                                    placeholder="Your Location"
                                    name="location"
                                    value={location}
                                />
                            </div>
                            <div className="user_all_skills rounded-lg flex items-center flex-col w-full py-4 justify-center gap-0 text-xl ">

{/* technology used */}

{/* technology which is selected */}
<div className=" my-2 flex flex-wrap max-w-[20rem] justify-center items-center gap-1 select-none">


    {/* show all technologies which is selected by selectedTechnology state */}
    {
        technology.map((name, index) => {
            return (
                <React.Fragment key={index}>
                    {/* one selected */}
                    <div className="technology_box choiced_options ">
                        <span className='pl-1 text-gray-100' >{name}</span>
                        <CloseIcon
                            onClick={() => {
                                const filteredOptions = technology.filter((currName) => currName !== name);
                                setTechnology(filteredOptions);
                            }}
                            className='selected_options_close custom-transition' style={{ height: '1.2rem', width: '1.2rem' }} />
                    </div>
                </React.Fragment>
            )
        })

    }

</div>




{/* technology which is selected */}
<div className="my-2 flex flex-wrap max-w-[20rem] justify-center items-center gap-1 select-none">

    {/* show all prpogramming lang which is selected by selectedTechnology state */}
    {
        programming.map((name) => {
            return (
                <React.Fragment key={name}>
                    {/* one selected */}
                    <div className="language_box choiced_options " >
                        <span className='pl-1 text-gray-100' >{name}</span>
                        <CloseIcon
                            onClick={() => {
                                const filteredOptions = programming.filter((currName) => currName !== name);
                                setProgramming(filteredOptions);
                            }}
                            className='selected_options_close custom-transition' style={{ height: '1.2rem', width: '1.2rem' }} />
                    </div>
                </React.Fragment>
            )
        })
    }

</div>
</div>
                        </div>


                      


                    </div>
                </div>
            </div>


            <ToastContainer />
        </>
    )
}

export default EditProfile
