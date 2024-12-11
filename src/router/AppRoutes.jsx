import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedRoutes from "./ProtectedRoutes";
import App from "../App.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import ApproveRequests from "../components/ApproveRequests/ApproveRequests.jsx";
import ProjectBatch from "../components/ProjectBatch/ProjectBatch.jsx";
import FacultySignIn from "../components/Auth/FacultySignIn.jsx";
import FacultySignUp from "../components/Auth/FacultySignUp.jsx";
import StudentSignIn from "../components/Auth/StudentSignIn.jsx";
import StudentSignUp from "../components/Auth/StudentSignUp.jsx";
import InternshipForm from "../components/Internship/InternshipForm.jsx";
import AllInternship from "../components/Internship/AllInternship.jsx";
import ProjectForm from "../components/Project/ProjectForm.jsx";
import SelectTeamMembers from "../components/Project/SelectTeamMembers.jsx";
import StudentProfile from "../components/Profile/StudentProfile.jsx";
import FacutlyProfile from "../components/Profile/FacutlyProfile.jsx";


const AppRoutes = () => {
  const location = useLocation();
  const projectId = useSelector((state) => state.auth.project_id);

  const showNavigation =
    location.pathname !== "/student-signin" &&
    location.pathname !== "/student-signup" &&
    location.pathname !== "/faculty-signup" &&
    location.pathname !== "/faculty-signin";

  return (
    <>
      {showNavigation && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/student-signin" element={<StudentSignIn />} />
        <Route path="/student-signup" element={<StudentSignUp />} />
        <Route path="/faculty-signin" element={<FacultySignIn />} />
        <Route path="/faculty-signup" element={<FacultySignUp />} />

        {/* Protected Routes for Faculty */}
        <Route element={<ProtectedRoutes allowedRoles={["Faculty"]} />}>
          <Route path="/" element={<App />} />
          <Route path="/requests" element={<ApproveRequests />} />
          <Route path="/project-batch" element={<ProjectBatch />} />
          <Route path="/profile" element={<FacutlyProfile />} />
        </Route>

        {/* Protected Routes for Students */}
        <Route element={<ProtectedRoutes allowedRoles={['Student']} />}>
          <Route path="/" element={<App />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/internship-form" element={<InternshipForm />} />
          <Route path="/all-internship" element={<AllInternship />} />
          {projectId === null && <Route path="/project-form" element={<ProjectForm />} />}
          <Route path="/select-team-members" element={<SelectTeamMembers />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
