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

const AppRoutes = () => {
  const location = useLocation();

  const showNavigation =
    location.pathname !== "/signin" && location.pathname !== "/signup";

  return (
    <>
      {showNavigation && <Navbar />}
      <Routes>
        <Route path="/" element={<App />} />

        {/* Faculty */}
        {/* Auth */}
        <Route path="faculty-signin" element={<FacultySignIn />} />
        <Route path="faculty-signup" element={<FacultySignUp />} />

        {/*Approve-ending-project*/}
        <Route path="requests" element={<ApproveRequests />} />

        {/* view all project batch wise */}
        <Route path="project-batch" element={<ProjectBatch />} />
        
        {/* Profile */}
        <Route path="profile" element={<Profile />} />

        {/* Student */}
        {/* Auth */}
        <Route path="student-signin" element={<StudentSignIn />} />
        <Route path="student-signup" element={<StudentSignUp />} />

        {/* Page Not Found route */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  );
};

export default AppRoutes;
