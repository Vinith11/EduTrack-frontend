import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { SnackbarContext } from "../../context/SnackbarProvider";
import { API_BASE_URL } from "../../services/config";
import {
  Calendar,
  MapPin,
  Building2,
  BookOpen,
  Link,
  GraduationCap,
  ChevronRight,
  Loader2,
  Send,
  Building,
} from "lucide-react";

export default function InternshipForm() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const jwt = useSelector((state) => state.auth.jwt);
  const usn = useSelector((state) => state.auth.usn);
  const batch = useSelector((state) => state.auth.batch);
  const navigate = useNavigate();
  const { handleSnackbarOpen } = useContext(SnackbarContext);

  const [formData, setFormData] = useState({
    internshipStart: "",
    internshipEnd: "",
    internshipDuration: "",
    internshipCertificate: "",
    internshipLocation: "",
    internshipDomain: "",
    internshipCompletionCertificateUrl: "",
    facultyUid: "",
    companyName: "",
  });

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/faculty/users/all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        if (response.status === 202) {
          const data = await response.json();
          setFacultyList(data);
        } else {
          throw new Error("Failed to fetch faculty list");
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFaculty();
  }, [jwt]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requestData = {
      student_usn: usn,
      academic_year: batch,
      internship_start: formData.internshipStart,
      internship_end: formData.internshipEnd,
      internship_duration: formData.internshipDuration,
      internship_certificate: formData.internshipCertificate,
      internship_location: formData.internshipLocation,
      internship_domain: formData.internshipDomain,
      internship_evaluation_sheet: formData.companyName,
      internship_completion_certificate_url:
        formData.internshipCompletionCertificateUrl,
      faculty_uid: formData.facultyUid,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/internships/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 201) {
        handleSnackbarOpen("Internship created successfully!", false);
        navigate("/all-internship");
      } else {
        handleSnackbarOpen("Failed to create internship", true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700/50">
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="inline-block"
            >
              <Building className="w-20 h-20 text-blue-500 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Internship Details
            </h2>
            <p className="text-gray-400 mt-2">
              Submit your internship information
            </p>
          </div>

          {loading ? (
            <div className="space-y-6">
              <div className="animate-pulse space-y-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-700/50 rounded-lg" />
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <input
                    type="date"
                    name="internshipStart"
                    value={formData.internshipStart}
                    onChange={handleChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                  />
                </div>

                <div className="relative group">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <input
                    type="date"
                    name="internshipEnd"
                    value={formData.internshipEnd}
                    onChange={handleChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                  />
                </div>
              </div>

              <div className="relative group">
                <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                />
              </div>

              <div className="relative group">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <input
                  type="text"
                  name="internshipDuration"
                  placeholder="Duration (e.g., 3 months)"
                  value={formData.internshipDuration}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                />
              </div>

              <div className="relative group">
                <BookOpen className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <input
                  type="text"
                  name="internshipCertificate"
                  placeholder="Certificate Name"
                  value={formData.internshipCertificate}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                />
              </div>

              <div className="relative group">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <input
                  type="text"
                  name="internshipLocation"
                  placeholder="Location"
                  value={formData.internshipLocation}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                />
              </div>

              <div className="relative group">
                <BookOpen className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <select
                  name="internshipDomain"
                  value={formData.internshipDomain}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                >
                  <option value="">Select Domain</option>
                  <option value="Web/App">Web/App</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="IoT">IoT</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="relative group">
                <Link className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <input
                  type="text"
                  name="internshipCompletionCertificateUrl"
                  placeholder="Certificate URL"
                  value={formData.internshipCompletionCertificateUrl}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                />
              </div>

              <div className="relative group">
                <GraduationCap className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <select
                  name="facultyUid"
                  value={formData.facultyUid}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                >
                  <option value="">Select Faculty</option>
                  {facultyList.map((faculty) => (
                    <option
                      key={faculty.faculty_uid}
                      value={faculty.faculty_uid}
                    >
                      {faculty.faculty_name}
                    </option>
                  ))}
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {loading ? "Submitting..." : "Submit Internship"}
              </motion.button>

              <div className="text-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/all-internship")}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mx-auto transition-colors"
                >
                  View All Internships
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}