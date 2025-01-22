import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearJwt } from "../../redux/slices/authSlice";
import {
  Menu,
  X,
  Home,
  LogOut,
  UserCheck,
  Users,
  UserCircle2,
  ClipboardList,
  Briefcase,
  FolderPlus,
  FileCheck,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const projectId = useSelector((state) => state.auth.project_id);

  const handleSignOut = () => {
    if (role === "Student") {
      navigate("/student-signin");
    } else if (role === "Faculty") {
      navigate("/faculty-signin");
    } else {
      navigate("/");
    }
    dispatch(clearJwt());
    localStorage.removeItem("role");
  };

  // Define navigation routes based on roles
  const studentRoutes = [
    {
      name: "Profile",
      href: "/profile",
      icon: <UserCircle2 className="w-5 h-5 text-blue-400" />,
    },
    {
      name: "Internship Form",
      href: "/internship-form",
      icon: <ClipboardList className="w-5 h-5 text-blue-400" />,
    },
    {
      name: "All Internship",
      href: "/all-internship",
      icon: <Briefcase className="w-5 h-5 text-blue-400" />,
    },
    ...(projectId === null
      ? [
          {
            name: "Project Form",
            href: "/project-form",
            icon: <FolderPlus className="w-5 h-5 text-blue-400" />,
          },
        ]
      : []),
  ];

  const facultyRoutes = [
    {
      name: "Profile",
      href: "/profile",
      icon: <UserCircle2 className="w-5 h-5 text-blue-400" />,
    },
    {
      name: "Pending Request",
      href: "/requests",
      icon: <ClipboardCheck className="w-5 h-5 text-blue-400" />,
    },
    {
      name: "Project Groups",
      href: "/project-batch",
      icon: <Users className="w-5 h-5 text-blue-400" />,
    },
    {
      name: "All Internship by Students",
      href: "/all-internship-by-batch",
      icon: <Briefcase className="w-5 h-5 text-blue-400" />,
    },
    {
      name: "All Projects by Batch",
      href: "/all-project-batch",
      icon: <BookOpen className="w-5 h-5 text-blue-400" />,
    },
  ];

  const navigation =
    role === "Student"
      ? studentRoutes
      : role === "Faculty"
      ? facultyRoutes
      : [];

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: showSidebar ? 0 : -320 }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed top-0 left-0 h-screen w-80 bg-gray-900 shadow-2xl z-50 border-r border-gray-800 overflow-y-auto"
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Home className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-100">{role} Portal</h2>
            </div>
            <button
              onClick={() => setShowSidebar(false)}
              className="p-2 rounded-lg hover:bg-gray-800"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 space-y-6">
          {navigation.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setShowSidebar(false);
                navigate(item.href);
              }}
              className="flex items-center gap-3 w-full p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-all duration-200 group"
            >
              <span className="transition-transform duration-200 group-hover:scale-110">
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full p-3 mt-6 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Header */}
      <div className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setShowSidebar(true)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-400" />
        </button>
        <h1 className="text-xl font-bold text-gray-100">Workflow</h1>
      </div>
    </>
  );
};

export default Sidebar;
