import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from "../../services/config";
import { BarChart3, ClipboardList, UserCheck } from "lucide-react";

const ApproveRequests = () => {
  const [projects, setProjects] = useState([]);
  const jwt = useSelector((state) => state.auth.jwt);

  // Fetch projects data on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/projects/pending-projects`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [jwt]);

  // Handle approve or decline
  const handleApproval = async (projectId, approvalStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/api/projects/approve/${projectId}?approvalStatus=${approvalStatus}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      // Refresh projects after approval or decline
      const updatedProjects = projects.filter((project) => project.project_id !== projectId);
      setProjects(updatedProjects);
      navigate("/project-batch")
    } catch (error) {
      console.error('Error updating project approval status:', error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">Project Approval Requests</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.project_id}
              className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-gray-600 transition-all"
            >
              <h2 className="text-xl font-semibold text-blue-400 mb-2">{project.student_project_name}</h2>
              <p className="text-sm text-gray-400 mb-1">
                <strong className="text-gray-300">Leader ID:</strong> {project.student_project_leader_id}
              </p>
              <p className="text-sm text-gray-400 mb-1">
                <strong className="text-gray-300">Domain:</strong> {project.student_project_domain}
              </p>
              <p className="text-sm text-gray-400 mb-1">
                <strong className="text-gray-300">Description:</strong> {project.student_project_description}
              </p>
              <p className="text-sm text-gray-400 mb-1">
                <strong className="text-gray-300">Start Date:</strong> {project.student_project_start}
              </p>
              <p className="text-sm text-gray-400 mb-1">
                <strong className="text-gray-300">Status:</strong> {project.student_project_completion_status}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleApproval(project.project_id, true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 rounded-full border border-green-500/30 text-green-400 transition-all"
                >
                  <UserCheck className="w-4 h-4" /> Approve
                </button>
                <button
                  onClick={() => handleApproval(project.project_id, false)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-full border border-red-500/30 text-red-400 transition-all"
                >
                  <ClipboardList className="w-4 h-4" /> Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApproveRequests;
