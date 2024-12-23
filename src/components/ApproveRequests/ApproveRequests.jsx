import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../services/config";
import { 
  UserCheck, 
  ClipboardList, 
  Folder, 
  UserCircle, 
  Code2, 
  FileText, 
  Calendar, 
  Activity,
  CheckCircle2,
  XCircle,
  ScrollText,
  InboxIcon
} from "lucide-react";
import { useNavigate } from "react-router";
import { SnackbarContext } from "../../context/SnackbarProvider";

const ApproveRequests = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const jwt = useSelector((state) => state.auth.jwt);
  const navigate = useNavigate();
  const { handleSnackbarOpen } = useContext(SnackbarContext);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/projects/pending-projects`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [jwt]);

  const handleApproval = async (projectId, approvalStatus) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/projects/approve/${projectId}?approvalStatus=${approvalStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status === 200 && approvalStatus === true) {
        handleSnackbarOpen("Approved Request", false);
        navigate("/project-batch");
      } else if (response.status === 200 && approvalStatus === false) {
        handleSnackbarOpen("Decline Request", true);
        navigate("/profile");
      }

      const updatedProjects = projects.filter(
        (project) => project.project_id !== projectId
      );
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Error updating project approval status:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-8 flex items-center justify-center gap-3">
          <ScrollText className="w-8 h-8" />
          Project Approval Requests
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-900/50 rounded-xl ">
            <InboxIcon className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-400 mb-2">No Pending Requests</h2>
            <p className="text-gray-500">There are currently no project requests requiring approval</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.project_id}
                className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-gray-600 transition-all"
              >
                <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
                  <Folder className="w-5 h-5" />
                  {project.student_project_name}
                </h2>
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-gray-300" />
                    <strong className="text-gray-300">Leader ID:</strong>{" "}
                    {project.student_project_leader_id}
                  </p>
                  
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-gray-300" />
                    <strong className="text-gray-300">Domain:</strong>{" "}
                    {project.student_project_domain}
                  </p>
                  
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-300" />
                    <strong className="text-gray-300">Description:</strong>{" "}
                    {project.student_project_description}
                  </p>
                  
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-300" />
                    <strong className="text-gray-300">Start Date:</strong>{" "}
                    {project.student_project_start}
                  </p>
                  
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-300" />
                    <strong className="text-gray-300">Status:</strong>{" "}
                    <span className={`px-2 py-1 rounded-full text-xs inline-flex items-center gap-1
                      ${project.student_project_completion_status === 'Completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'}`}
                    >
                      {project.student_project_completion_status === 'Completed' 
                        ? <CheckCircle2 className="w-3 h-3" />
                        : <Activity className="w-3 h-3" />
                      }
                      {project.student_project_completion_status}
                    </span>
                  </p>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => handleApproval(project.project_id, true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 rounded-full border border-green-500/30 text-green-400 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve
                  </button>
                  <button
                    onClick={() => handleApproval(project.project_id, false)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-full border border-red-500/30 text-red-400 transition-all"
                  >
                    <XCircle className="w-4 h-4" /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveRequests;