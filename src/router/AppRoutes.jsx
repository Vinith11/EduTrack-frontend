import { Route, Routes, useLocation } from "react-router-dom";
import App from "../App.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import ApproveRequests from "../components/ApproveRequests/ApproveRequests.jsx";
import ProjectBatch from "../components/ProjectBatch/ProjectBatch.jsx";
import Profile from "../components/Profile/Profile.jsx";
import FacultySignIn from "../components/Auth/FacultySignIn.jsx";
import FacultySignUp from "../components/Auth/FacultySignUp.jsx";
import StudentSignIn from "../components/Auth/StudentSignIn.jsx";
import StudentSignUp from "../components/Auth/StudentSignUp.jsx";
import InternshipForm from "../components/Internship/InternshipForm.jsx";
import AllInternship from "../components/Internship/AllInternship.jsx";
import ProjectForm from "../components/Project/ProjectForm.jsx";
import SelectTeamMembers from "../components/Project/SelectTeamMembers.jsx";

const AppRoutes = () => {
  const location = useLocation();

  const showNavigation =
    location.pathname !== "/student-signin" &&
    location.pathname !== "/student-signup" &&
    location.pathname !== "/faculty-signup" &&
    location.pathname !== "/faculty-signin";

  return (
    <>
      {showNavigation && <Navbar />}
      <Routes>
        <Route path="/" element={<App />} />

        {/* Faculty */}
        {/* Auth */}
        <Route path="/faculty-signin" element={<FacultySignIn />} />
        <Route path="/faculty-signup" element={<FacultySignUp />} />

        {/*Approve-ending-project*/}
        <Route path="/requests" element={<ApproveRequests />} />

        {/* view all project batch wise */}
        <Route path="/project-batch" element={<ProjectBatch />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Student */}
        {/* Auth */}
        <Route path="/student-signin" element={<StudentSignIn />} />
        <Route path="/student-signup" element={<StudentSignUp />} />

        {/* Internship form */}
        <Route path="/internship-form" element={<InternshipForm />} />
        <Route path="/all-internship" element={<AllInternship />} />

        {/* Project */}
        <Route path="/project-form" element={<ProjectForm />} />
        <Route path="/select-team-members" element={<SelectTeamMembers />} />

        {/* Page Not Found route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
