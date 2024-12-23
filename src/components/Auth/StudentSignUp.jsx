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
  School,
  Phone,
  Hash,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setJwt, setUserProfile } from "../../redux/slices/authSlice";

const StudentSignUp = () => {
  const [formData, setFormData] = useState({
    usn: "",
    student_name: "",
    student_phone: "",
    student_email: "",
    student_password: "",
    student_batch: "",
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
        `${API_BASE_URL}/auth/student/signup`,
        formData
      );

      if (response.status === 200) {
        const { jwt } = response.data;

        dispatch(setJwt(jwt));

        const profileResponse = await axios.get(
          `${API_BASE_URL}/api/student/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const { usn, email, batch, project_id } = profileResponse.data;

        dispatch(setUserProfile({ usn, email, batch, project_id }));

        toast.success("Sign Up Successful!");
        navigate("/student-profile");
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
                    <School className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Student Sign Up
                  </h2>
                  <p className="text-gray-400 mt-2">
                    Join our academic community
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
                      <Hash className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type="text"
                        name="usn"
                        placeholder="USN"
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                      />
                    </div>

                    <div className="relative group">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type="text"
                        name="student_name"
                        placeholder="Full Name"
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                      />
                    </div>

                    <div className="relative group">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type="tel"
                        name="student_phone"
                        placeholder="Phone Number"
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                      />
                    </div>

                    <div className="relative group">
                      <AtSign className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type="email"
                        name="student_email"
                        placeholder="Email Address"
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                      />
                    </div>

                    <div className="relative group">
                      <Key className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type="password"
                        name="student_password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                      />
                    </div>

                    <div className="relative group">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <input
                        type="text"
                        name="student_batch"
                        placeholder="Batch Year (e.g., 2025)"
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
                    <User className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Already Registered?
                  </h2>
                  <p className="text-gray-400 mt-2">
                    Sign in to access your account
                  </p>
                </div>

                <div className="bg-gray-700/30 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
                  <p className="text-gray-300 leading-relaxed">
                    Welcome back! If you already have a student account, please
                    sign in to access your dashboard and view your academic progress.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/student-signin")}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-green-500/20"
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

export default StudentSignUp;