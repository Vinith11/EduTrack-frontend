import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../services/config";
import {
  Users,
  UserCheck,
  ClipboardList,
  BarChart3,
  Mail,
  Phone,
  BookOpen,
  Award,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jwt = useSelector((state) => state.auth.jwt);

  useEffect(() => {
    const fetchFacultyProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/faculty/users/profile`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setFaculty(response.data);
      } catch (err) {
        setError("Failed to fetch faculty profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyProfile();
  }, [jwt]);

  if (loading) {
    return <div className="text-center mt-10">Loading faculty profile...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!faculty) {
    return <div className="text-center mt-10">No faculty profile available.</div>;
  }

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <Header facultyInfo={faculty} />
        <Stats />
        <DetailedInfo facultyInfo={faculty} />
      </div>
    </div>
  );
};

const Header = ({ facultyInfo }) => {
  const image = "https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg";

  return (
    <div className="relative bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-8 backdrop-blur-sm border border-gray-800">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <img
            src={image}
            alt="Profile"
            className="w-48 h-48 rounded-full border-4 border-blue-500/30"
          />
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-[#0f172a]"></div>
        </div>
        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="text-4xl font-bold text-blue-400">
            {facultyInfo.faculty_name}
          </h1>
          <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2">
            <GraduationCap className="w-5 h-5" />
            Professor of Computer Science
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => {}}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-full border border-blue-500/30 transition-all"
            >
              <Mail className="w-4 h-4" />
              Contact
            </button>
            <button
              onClick={() => {}}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-full border border-purple-500/30 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              View Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { icon: <Users className="w-6 h-6" />, label: "Students Enrolled", value: "24" },
    { icon: <Award className="w-6 h-6" />, label: "Years Experience", value: "15+" },
    { icon: <Briefcase className="w-6 h-6" />, label: "Projects Guided", value: "45" },
    { icon: <BookOpen className="w-6 h-6" />, label: "Publications", value: "12" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
              {stat.icon}
            </div>
            <div className="space-y-1">
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const DetailedInfo = ({ facultyInfo }) => {
  const details = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: facultyInfo.faculty_email },
    { icon: <Phone className="w-5 h-5" />, label: "Phone", value: facultyInfo.faculty_phone },
    { icon: <MapPin className="w-5 h-5" />, label: "Department", value: "Computer Science" },
    { icon: <Calendar className="w-5 h-5" />, label: "Joined", value: "2008" },
    { icon: <Clock className="w-5 h-5" />, label: "Office Hours", value: "Mon-Fri, 10AM-4PM" },
  ];

  return (
    <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
      <h2 className="text-2xl font-bold text-blue-400 mb-8">Faculty Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {details.map((detail, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="p-2 bg-gray-800 rounded-lg text-blue-400">
              {detail.icon}
            </div>
            <div className="space-y-1">
              <p className="text-gray-400 text-sm">{detail.label}</p>
              <p className="text-gray-200">{detail.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyProfile;