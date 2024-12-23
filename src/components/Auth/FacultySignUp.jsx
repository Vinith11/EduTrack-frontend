import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { API_BASE_URL } from "../../services/config";
import toast, { Toaster } from "react-hot-toast";
import {
  User,
  LogIn,
  UserPlus,
  Key,
  AtSign,
  ChevronRight,
  GraduationCap,
  School,
  Phone,
  Hash,
} from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setJwt, setFacultyProfile } from "../../redux/slices/authSlice";

const FacultySignUp = () => {
  const [formData, setFormData] = useState({
    faculty_uid: "",
    faculty_name: "",
    faculty_phone: "",
    faculty_email: "",
    faculty_password: "",
    faculty_role: "Faculty",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/faculty/signup`,
        formData
      );

      if (response.status === 200) {
        const { jwt } = response.data;

        dispatch(setJwt(jwt));

        const profileResponse = await axios.get(
          `${API_BASE_URL}/api/faculty/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const { faculty_uid, faculty_email } = profileResponse.data;

        dispatch(setFacultyProfile({ faculty_uid, faculty_email }));

        toast.success("Sign Up Successful!");
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during Sign Up. Please try again.");
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
              {/* Sign Up Form */}
              <div className="space-y-6">
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <School className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Faculty Sign Up
                  </h2>
                  <p className="text-gray-400 mt-2">
                    Create your academic profile with us
                  </p>
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
                      <Hash className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      <input
                        type="text"
                        name="faculty_uid"
                        placeholder="Faculty ID"
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                      />
                    </div>

                    <div className="relative group">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      <input
                        type="text"
                        name="faculty_name"
                        placeholder="Full Name"
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                      />
                    </div>

                    <div className="relative group">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      <input
                        type="tel"
                        name="faculty_phone"
                        placeholder="Phone Number"
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                      />
                    </div>

                    <div className="relative group">
                      <AtSign className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      <input
                        type="email"
                        name="faculty_email"
                        placeholder="Email Address"
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                      />
                    </div>

                    <div className="relative group">
                      <Key className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      <input
                        type="password"
                        name="faculty_password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-purple-500/20"
                    >
                      <UserPlus className="w-5 h-5" />
                      Sign Up
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Sign In Section */}
              <div className="space-y-6">
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <GraduationCap className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Already Registered?
                  </h2>
                  <p className="text-gray-400 mt-2">
                    Sign in to access your account
                  </p>
                </div>

                <div className="bg-gray-700/30 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
                  <p className="text-gray-300 leading-relaxed">
                    Welcome back! If you already have a faculty account, please
                    sign in to access your dashboard and manage your academic
                    activities.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/faculty-signin")}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20"
                >
                  <LogIn className="w-5 h-5" />
                  Sign In
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FacultySignUp;
