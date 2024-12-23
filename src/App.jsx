import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GraduationCap, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const App = () => {
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.auth.jwt);

  if (jwt) {
    const role = useSelector((state) => state.auth.role);
    if(role === "Faculty"){
      navigate("/profile");
    } else{
      navigate("/student-profile");
    }

    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to Academic Portal
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Student Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700/50 cursor-pointer"
              onClick={() => navigate("/student-signin")}
            >
              <Users className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">I'm a Student</h2>
              <p className="text-gray-400 mb-6">
                Access your academic profile, submit projects, and manage internships
              </p>
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center justify-center text-blue-400"
              >
                <span className="mr-2">Continue as Student</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* Faculty Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700/50 cursor-pointer"
              onClick={() => navigate("/faculty-signin")}
            >
              <GraduationCap className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">I'm a Faculty</h2>
              <p className="text-gray-400 mb-6">
                Review student projects, manage batches, and track academic progress
              </p>
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center justify-center text-purple-400"
              >
                <span className="mr-2">Continue as Faculty</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;