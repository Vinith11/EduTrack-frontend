import { useSelector } from "react-redux";
import FacultyProfile from "./FacutlyProfile";
import StudentProfile from "./StudentProfile";
import { User } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const role = useSelector((state) => state.auth.role);
  const [loading, setLoading] = useState(false);
  if (role === "Faculty") {
    return <FacultyProfile />;
  } else if (role === "Student") {
    return <StudentProfile />;
  }

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-gray-100 flex items-center justify-center">
      <div className="animate-spin text-blue-500">
        <User className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Profile;
