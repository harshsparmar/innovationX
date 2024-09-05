import React, { useContext, useEffect, useState } from 'react';
import '../CSS/Profile.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import GradeIcon from '@mui/icons-material/Grade';
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
        // console.log(data.data);
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
        <div className="heading-container flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-700 text-white px-10 py-4 rounded-lg shadow-lg">
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
        <div className="profile-content flex flex-wrap justify-center items-start gap-8 py-10">
          {/* Profile Card */}
          <div className="profile-card bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
            <div className="profile-image flex flex-col items-center">
              <img
                src={student.image ? student.image : "./Images/default.jpg"}
                alt="user"
                className="w-32 h-32 rounded-full object-cover shadow-lg"
              />
              <h2 className="text-2xl font-bold mt-4">{student.name || "Unknown Student"}</h2>
            </div>
            <div className="social-links mt-6">
              {student.link.website && (
                <div className="flex items-center gap-3">
                  <LinkIcon className="text-blue-500" />
                  <Link to={student.link.website} target="_blank" className="hover:underline">
                    {student.link.website}
                  </Link>
                </div>
              )}
              {student.link.linkdin && (
                <div className="flex items-center gap-3">
                  <LinkedInIcon className="text-blue-500" />
                  <Link to={student.link.linkdin} target="_blank" className="hover:underline">
                    {student.link.linkdin}
                  </Link>
                </div>
              )}
              {student.link.github && (
                <div className="flex items-center gap-3">
                  <GitHubIcon className="text-gray-900" />
                  <Link to={student.link.github} target="_blank" className="hover:underline">
                    {student.link.github}
                  </Link>
                </div>
              )}
              {student.link.instagram && (
                <div className="flex items-center gap-3">
                  <InstagramIcon className="text-pink-500" />
                  <Link to={student.link.instagram} target="_blank" className="hover:underline">
                    {student.link.instagram}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="details-card bg-slate-50 shadow-lg rounded-lg p-6 w-[300px]">
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
      )}

      {student && <ProjectCard studentId={student._id} />}
    </div>
  );
};

export default Profile;
