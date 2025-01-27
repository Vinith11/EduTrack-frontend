import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setJwt, setFacultyProfile } from "../../redux/slices/authSlice"; // Update with your actual path
import { SnackbarContext } from "../../context/SnackbarProvider";
import { API_BASE_URL } from "../../services/config";
import toast, { Toaster } from 'react-hot-toast';
import { User, Lock, Mail, LogIn, UserPlus, Key, AtSign, ChevronRight, GraduationCap, School } from "lucide-react";
import "./Signin.css";
import { motion } from "framer-motion";

const FacultySignIn = () => {
  const [formData, setFormData] = useState({
    faculty_email: "",
    faculty_password: "",
  });
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/faculty/signin`, {
        email: formData.faculty_email,
        password: formData.faculty_password,
      });

      const { jwt, status } = response.data;

      if (status) {
        // Save JWT in Redux state
        dispatch(setJwt(jwt));

        
        const profileResponse = await axios.get(
          `${API_BASE_URL}/api/faculty/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          }
        );

        const { faculty_uid, faculty_email }  = profileResponse.data;

        dispatch(setFacultyProfile({faculty_uid, faculty_email}));


        toast.success("Sign In Successful!");
        navigate("/profile"); // Redirect to a dashboard or another page
      } else {
        toast.error("Sign In Failed! Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during Sign In. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Sign In Form */}
              <div className={`space-y-6 ${isSignUpMode ? 'hidden md:block' : ''}`}>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <GraduationCap className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Faculty Sign In</h2>
                  <p className="text-gray-400 mt-2">Welcome back, please sign in to continue</p>
                </div>

                {isLoading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-12 bg-gray-700/50 rounded-lg"></div>
                    <div className="h-12 bg-gray-700/50 rounded-lg"></div>
                    <div className="h-12 bg-gray-700/50 rounded-lg"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative group">
                      <AtSign className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type="text"
                        name="faculty_email"
                        placeholder="Faculty Email"
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                      />
                    </div>

                    <div className="relative group">
                      <Key className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type="password"
                        name="faculty_password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20"
                    >
                      <LogIn className="w-5 h-5" />
                      Sign In
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Sign Up Section */}
              <div className={`space-y-6 ${!isSignUpMode ? 'hidden md:block' : ''}`}>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <School className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">New Faculty?</h2>
                  <p className="text-gray-400 mt-2">Create your academic profile with us</p>
                </div>

                <div className="bg-gray-700/30 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
                  <p className="text-gray-300 leading-relaxed">
                    Join our academic community and unlock opportunities to guide the next generation of innovators. Create your comprehensive faculty profile and connect with aspiring students.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/faculty-signup")}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-purple-500/20"
                >
                  <UserPlus className="w-5 h-5" />
                  Get Started
                </motion.button>
              </div>
            </div>

            {/* Mode Toggle */}
            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/faculty-signup")}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mx-auto transition-colors"
              >
                Need to create an account?
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FacultySignIn;
