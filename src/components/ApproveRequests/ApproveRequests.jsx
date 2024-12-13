import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from "../../services/config";


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
      await axios.put(`http://localhost:5454/api/projects/approve/${projectId}?approvalStatus=${approvalStatus}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      // Refresh projects after approval or decline
      const updatedProjects = projects.filter((project) => project.project_id !== projectId);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error updating project approval status:', error);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Project Approval Requests</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.project_id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-800">{project.student_project_name}</h2>
            <p className="text-sm text-gray-600">
              <strong>Leader ID:</strong> {project.student_project_leader_id}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Domain:</strong> {project.student_project_domain}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Description:</strong> {project.student_project_description}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Start Date:</strong> {project.student_project_start}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong> {project.student_project_completion_status}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleApproval(project.project_id, true)}
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => handleApproval(project.project_id, false)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApproveRequests;
