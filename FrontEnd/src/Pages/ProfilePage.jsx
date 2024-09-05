import React, { useContext, useEffect, useState } from 'react';
import '../CSS/Profile.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import ProjectCard from '../Components/ProjectComponents/ProjectCard';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getStudentInfo } from '../utils/ApiRoutes';
import axios from 'axios';
import mainContext from '../Components/context/mainContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const searchQuery = useSearchParams()[0];
  const referenceId = searchQuery.get("referenceId"); 
  const { navbarRender, setNavbarRender } = useContext(mainContext);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      navigate("/auth");
    }
    else {
      if (referenceId) {
        fetchStudent(referenceId);
      } else fetchStudent(studentId);
    }
  }, [])
  const fetchStudent = async (studentId) => {
    try {
      const data = await axios.get(`${getStudentInfo}/${studentId}`);
      if (data.data.success === false) {
        toast.error(data.data.msg);
      } else {
        if (data.data) setStudent(data.data);
        if (!referenceId) setNavbarRender(!navbarRender); // trigger navbar to fetch data 
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  // edit button handle
  const handleEdit = (e) => {
    localStorage.setItem("studentInfo", JSON.stringify(student));
    navigate('/edit-profile')
  }

  return (
    <div className="profile-container flex flex-col w-full p-4">
      {!referenceId && (
        <div className="heading-container w-full flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-700 text-white px-10 py-4 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold">Profile Section</h1>
          <button
            className="edit-button px-5 py-2 bg-white text-blue-700 font-semibold rounded-md hover:bg-gray-100 transition duration-300"
            onClick={handleEdit}
          >
            Edit Profile
          </button>
        </div>
      )}

      {student && (
        <div className="mt-24 w-36 h-[500px] profile-content flex flex-row items-center bg-gray-200 backdrop-sepia-0 gap-8 py-10 shadow-2xl shadow-black rounded-lg p-10 transform hover:scale-105 hover:shadow-lg hover: duration-300">

          {/* Profile Image and Info */}
          <div className="profile-card flex flex-col items-center">
            <div className="profile-image border rounded-full">
              <img
                src={student.image ? student.image : "./Images/default.jpg"}
                alt="user"
                className="w-32 h-32 rounded-full object-cover shadow-lg"
              />
            </div>
            <h2 className="text-2xl font-bold mt-4">{student.name || "Unknown Student"}</h2>

                     <div className='social_links flex flex-col gap-1 w-full text-xl pl-9 mt-10'>
    

                {/* My Website link */}
                <div className="website_link flex gap-3">
                  <LinkIcon className='' />
                  <Link to={(student.link.website.length) > 5 ? student.link.website : "#website"} className='custom-values' target={`${(student.link.website.length) > 5 ? "_blank" : ""}`} rel="noopener noreferrer">
                    {(student.link.website.length) > 5 ? (student.link.website).slice(0, 25) : "N/A "}
                  </Link>
                </div>
                {/* linkedin link */}
                <div className="linkedin_link flex gap-3">
                  <LinkedInIcon className='' />
                  <Link to={(student.link.linkdin.length) > 5 ? student.link.linkdin : "#linkdin"} className='custom-values' target={`${(student.link.linkdin.length) > 5 ? "_blank" : ""}`} rel="noopener noreferrer">
                    {(student.link.linkdin.length) > 5 ? (student.link.linkdin).slice(0, 25) : "N/A"}
                  </Link>
                </div>
                {/* github link */}
                <div className="github_link flex gap-3">
                  <GitHubIcon className='' />
                  <Link to={(student.link.github.length) > 5 ? student.link.github : "#github"} className='custom-values' target={`${(student.link.github.length) > 5 ? "_blank" : ""}`} rel="noopener noreferrer">
                    {(student.link.github.length) > 5 ? (student.link.github).slice(0, 25) : "N/A"}
                  </Link>
                </div>

                {/* instagram link */}
                <div className="instagram_link flex gap-3">
                  <InstagramIcon className='' />
                  <Link to={(student.link.instagram.length) > 5 ? student.link.instagram : "#instagram"} className='custom-values' target={`${(student.link.instagram.length) > 5 ? "_blank" : ""}`} rel="noopener noreferrer">
                    {(student.link.instagram.length) > 5 ? (student.link.instagram).slice(0, 25) : "N/A"}
                  </Link>
                </div>
              </div>

            </div>
      
          {/* Details Section */}
         <div className='flex flex-col '>
         <h1 className='text-center underline text-2xl font-bold'>Personal details</h1>
          <div className="details-card w-full ml-16 max-w-lg flex flex-col items-start p-6">
            <p className="text-lg">
              <strong>Email:</strong> {student.email || "N/A"}
            </p>
            <p className="text-lg">
              <strong>College:</strong> {student.college || "N/A"}
            </p>
            <p className="text-lg">
              <strong>Course:</strong> {student.course || "N/A"}
            </p>
            <p className="text-lg">
              <strong>Pass Year:</strong> {student.passYear || "N/A"}
            </p>
            <p className="text-lg">
              <strong>Sem/Year:</strong> {student.sem_year || "N/A"}
            </p>
            <p className="text-lg">
              <strong>Location:</strong> {student.location || "N/A"}
            </p>
          </div>
         </div>
        </div>
      )}

      {student && <ProjectCard studentId={student._id} />}
    </div>
  );
};

export default Profile;
