import { Route, Routes, useLocation } from "react-router-dom";
import App from "../App.jsx";
import SignIn from "../components/Auth/SignIn.jsx";
import SignUp from "../components/Auth/SignUp.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import ApproveRequests from "../components/ApproveRequests/ApproveRequests.jsx";
import ProjectBatch from "../components/ProjectBatch/ProjectBatch.jsx";
import Profile from "../components/Profile/Profile.jsx";

const AppRoutes = () => {
  const location = useLocation();

  const showNavigation =
    location.pathname !== "/signin" && location.pathname !== "/signup";

  return (
    <>
      {showNavigation && <Navbar />}
      <Routes>
        <Route path="/" element={<App />} />

        {/* Auth */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        {/*Approve-ending-project*/}
        <Route path="requests" element={<ApproveRequests />} />

        {/* view all project batch wise */}
        <Route path="project-batch" element={<ProjectBatch />} />
        
        {/* Profile */}
        <Route path="profile" element={<Profile />} />

        {/* Page Not Found route */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  );
};

export default AppRoutes;
