import { useSelector } from "react-redux";
import FacultyProfile from "./FacutlyProfile";
import StudentProfile from "./StudentProfile";

const Profile = () => {
  const role = useSelector((state) => state.auth.role);

  
  if (role === "Faculty") {
    return <FacultyProfile />;
  } else if (role === "Student") {
    return <StudentProfile />;
  }

  return <div>No profile available. Please log in.</div>;
};

export default Profile;
