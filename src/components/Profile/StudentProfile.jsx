import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../services/config";
import toast from 'react-hot-toast';
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Award,
  Briefcase,
  GraduationCap,
  Calendar,
  Hash,
  FileText,
  CheckCircle,
  XCircle,
  Book,
  Code,
  Users,
  Target,
  LinkIcon,
} from "lucide-react";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.jwt);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileResponse = await axios.get(
          `${API_BASE_URL}/api/student/users/profile`,
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );

        console.log(profileResponse.data)

        const profileData = profileResponse.data;
        setStudent(profileData);

        if (profileData.project_id) {
          const projectResponse = await axios.get(
            `${API_BASE_URL}/api/projects/project-by-id/${profileData.project_id}`,
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          );
          setProject(projectResponse.data);
          console.log(projectResponse.data)
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch profile or project details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [jwt]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0f172a] text-gray-100 flex items-center justify-center">
        <div className="animate-spin text-blue-500">
          <Briefcase className="w-8 h-8" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#0f172a] text-red-400 flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen w-full bg-[#0f172a] text-gray-100 flex items-center justify-center">
        No student data available.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <Header studentInfo={student} />
        <Stats projectInfo={project} />
        <DetailedInfo studentInfo={student} />
        {project && <ProjectInfo projectInfo={project} />}
      </div>
    </div>
  );
};

const Header = ({ studentInfo }) => {
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
            {studentInfo.student_name}
          </h1>
          <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2">
            <Hash className="w-5 h-5" />
            {studentInfo.usn}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-full border border-blue-500/30 transition-all">
              <Mail className="w-4 h-4" />
              Contact
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-full border border-purple-500/30 transition-all">
              <FileText className="w-4 h-4" />
              View Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stats = ({ projectInfo }) => {

  const batch = useSelector((state) => state.auth.batch);
  const stats = [
    { icon: <Book className="w-6 h-6" />, label: "Batch", value: batch || "N/A" },
    { icon: <Code className="w-6 h-6" />, label: "Projects", value: projectInfo ? "1" : "0" },
    { icon: <Users className="w-6 h-6" />, label: "Team Size", value : projectInfo?.team_members.length + 1 },
    { icon: <Target className="w-6 h-6" />, label: "Domain", value: projectInfo?.student_project_domain || "N/A" },
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

const DetailedInfo = ({ studentInfo }) => {
  const details = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: studentInfo.student_email },
    { icon: <Phone className="w-5 h-5" />, label: "Phone", value: studentInfo.student_phone },
    { icon: <Calendar className="w-5 h-5" />, label: "Batch", value: studentInfo.student_batch },
    { icon: <Hash className="w-5 h-5" />, label: "USN", value: studentInfo.usn },
  ];

  return (
    <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
      <h2 className="text-2xl font-bold text-blue-400 mb-8">Student Information</h2>
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

const ProjectInfo = ({ projectInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentProjectUrl: '',
    studentProjectReport: ''
  });
  const [loading, setLoading] = useState(false);

  const jwt = useSelector((state) => state.auth.jwt);

  const showAddReportButton =
    projectInfo.faculty_approval_status &&
    !projectInfo.studentProjectUrl &&
    !projectInfo.studentProjectReport;

  // Filter project details dynamically
  const projectDetails = [
    { icon: <BookOpen className="w-5 h-5" />, label: "Project Name", value: projectInfo.student_project_name },
    { icon: <Code className="w-5 h-5" />, label: "Domain", value: projectInfo.student_project_domain },
    { icon: <Target className="w-5 h-5" />, label: "Type", value: projectInfo.student_project_type },
    { icon: <Calendar className="w-5 h-5" />, label: "Academic Year", value: projectInfo.academic_year },
    { icon: <GraduationCap className="w-5 h-5" />, label: "Guide ID", value: projectInfo.student_project_guide_id },
    projectInfo.studentProjectUrl && {
      icon: <LinkIcon className="w-5 h-5" />,
      label: "Project URL",
      value: <a href={projectInfo.studentProjectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
        {projectInfo.studentProjectUrl}
      </a>,
    },
    projectInfo.studentProjectReport && {
      icon: <LinkIcon className="w-5 h-5" />,
      label: "Report URL",
      value: <a href={projectInfo.studentProjectReport} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
        {projectInfo.studentProjectReport}
      </a>,
    },
    {
      icon: projectInfo.faculty_approval_status ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />,
      label: "Approval Status",
      value: projectInfo.faculty_approval_status ? "Approved" : "Pending",
      status: projectInfo.faculty_approval_status
    },
  ].filter(Boolean); // Filters out null entries

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/projects/${projectInfo.project_id}/update-urls`,
        formData,
        {
          headers: { Authorization: `Bearer ${jwt}` }
        }
      );

      if (response.status === 200) {
        toast.success('Project URLs updated successfully');
        setIsModalOpen(false);

        // Update the local state to reflect changes
        projectInfo.studentProjectUrl = formData.studentProjectUrl;
        projectInfo.studentProjectReport = formData.studentProjectReport;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-blue-400">Project Information</h2>
        {showAddReportButton && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all"
          >
            Add Report
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectDetails.map((detail, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className={`p-2 bg-gray-800 rounded-lg ${
              detail.status !== undefined ? (detail.status ? 'text-green-400' : 'text-red-400') : 'text-blue-400'
            }`}>
              {detail.icon}
            </div>
            <div className="space-y-1">
              <p className="text-gray-400 text-sm">{detail.label}</p>
              <p className={`text-gray-200 ${
                detail.status !== undefined ? (detail.status ? 'text-green-400' : 'text-red-400') : ''
              }`}>
                {detail.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Project Description</h3>
        <p className="text-gray-400">
          {projectInfo.student_project_description || "No description available."}
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Add Project URLs</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Project URL</label>
                <input
                  type="text"
                  name="studentProjectUrl"
                  value={formData.studentProjectUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="https://example.com/project"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Project Report URL</label>
                <input
                  type="text"
                  name="studentProjectReport"
                  value={formData.studentProjectReport}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="https://example.com/report"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default StudentProfile;