import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import AllInternshipByBatch from "../components/Internship/AllInternshipByBatch.jsx";
import AllProjectBatch from "../components/ProjectBatch/AllProjectBatch.jsx";
import Profile from "../components/Profile/Profile.jsx";


const AppRoutes = () => {
  const location = useLocation();
  const jwt = useSelector((state) => state.auth.jwt);
  const projectId = useSelector((state) => state.auth.project_id);

  const showNavigation =
    location.pathname !== "/" &&
    location.pathname !== "/student-signin" &&
    location.pathname !== "/student-signup" &&
    location.pathname !== "/faculty-signup" &&
    location.pathname !== "/faculty-signin" &&
    jwt;

  return (
    <>
      {showNavigation && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={jwt ? <Navigate to="/profile" replace /> : <App />} />
        <Route path="/student-signin" element={jwt ? <Navigate to="/profile" replace /> : <StudentSignIn />} />
        <Route path="/student-signup" element={jwt ? <Navigate to="/profile" replace /> : <StudentSignUp />} />
        <Route path="/faculty-signin" element={jwt ? <Navigate to="/profile" replace /> : <FacultySignIn />} />
        <Route path="/faculty-signup" element={jwt ? <Navigate to="/profile" replace /> : <FacultySignUp />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes allowedRoles={["Faculty"]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/requests" element={<ApproveRequests />} />
          <Route path="/project-batch" element={<ProjectBatch />} />
          <Route path="/all-project-batch" element={<AllProjectBatch />} />
          <Route path="/all-internship-by-batch" element={<AllInternshipByBatch />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["Student"]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/internship-form" element={<InternshipForm />} />
          <Route path="/all-internship" element={<AllInternship />} />
          {projectId === null && <Route path="/project-form" element={<ProjectForm />} />}
          <Route path="/select-team-members" element={<SelectTeamMembers />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
