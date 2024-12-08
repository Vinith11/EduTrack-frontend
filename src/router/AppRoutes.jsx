import { Route, Routes, useLocation } from "react-router-dom";
import App from "../App.jsx";
import Home1 from "../Home1.jsx";
import Home2 from "../Home2.jsx";
import Home3 from "../Home3.jsx";
import SignIn from "../components/Auth/SignIn.jsx";
import SignUp from "../components/Auth/SignUp.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import ApproveRequests from "../components/ApproveRequests/ApproveRequests.jsx";
import ProjectBatch from "../components/ProjectBatch/ProjectBatch.jsx";

const AppRoutes = () => {
  const location = useLocation();

  const showNavigation =
    location.pathname !== "/signin" && location.pathname !== "/signup";

  return (
    <>
      {showNavigation && <Navbar />}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="home1" element={<Home1 />} />
        <Route path="home2" element={<Home2 />} />
        <Route path="home3" element={<Home3 />} />

        {/* Auth */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        {/*Approve-ending-project*/}
        <Route path="requests" element={<ApproveRequests />} />

        {/* view all project batch wise */}
        <Route path="project-batch" element={<ProjectBatch />} />

        {/* Page Not Found route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
