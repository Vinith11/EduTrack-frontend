import { div } from "framer-motion/client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearJwt } from "../../redux/slices/authSlice";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Pending request", href: "/requests" },
  { name: "Project Groups", href: "/project-batch" },
  { name: "Profile", href: "/profile" },
  { name: "Internship Form", href: "/internship-form" },
  { name: "All Internship", href: "/all-internship" },
  { name: "Project form", href: "/project-form" },
];

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  const handleSignOut = () => {
    // Remove JWT from local storage and clear it from state
    dispatch(clearJwt()); // Assuming you're using Redux to manage JWT
    localStorage.removeItem("role"); // Clear role from local storage

    // Navigate based on role
    if (role === "Student") {
      navigate("/student-signin");
    } else if (role === "Faculty") {
      navigate("/faculty-signin");
    } else {
      navigate("/"); // Default route in case role is missing
    }
  };

  return (
    <>
      {showSidebar ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed left-10 top-6 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <div className="">
          <svg
            onClick={() => setShowSidebar(!showSidebar)}
            className="z-30 flex items-center cursor-pointer top-6 px-2"
            fill="#2563EB"
            viewBox="0 0 100 80"
            width="40"
            height="40"
          >
            <rect width="100" height="10"></rect>
            <rect y="30" width="100" height="10"></rect>
            <rect y="60" width="100" height="10"></rect>
          </svg>
        </div>
      )}

      <div
        className={`top-0 left-0 w-[20vw] max-sm:w-[55vw] bg-blue-600 p-10 pl-15 text-white fixed h-full z-40 ease-in-out duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mt-20">
          <>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex flex-col py-3 text-l font-semibold text-white"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setShowSidebar(!showSidebar);
                handleSignOut();
              }}
              className="absolute bottom-0 left-0 w-full py-3 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600"
            >
              Log Out
            </button>
          </>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
