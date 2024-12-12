import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../services/config";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jwt = useSelector((state) => state.auth.jwt); // Get JWT from Redux state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch student profile
        const profileResponse = await axios.get(
          `${API_BASE_URL}/api/student/users/profile`,
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );

        const profileData = profileResponse.data;
        setStudent(profileData);

        if (profileData.project_id) {
          // Fetch project details if project_id is not null
          const projectResponse = await axios.get(
            `${API_BASE_URL}/api/projects/project-by-id/${profileData.project_id}`,
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          );
          setProject(projectResponse.data);
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch profile or project details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [jwt]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!student) {
    return <div className="text-center mt-10">No student data available.</div>;
  }

  const {
    usn,
    student_name,
    student_phone,
    student_email,
    student_batch,
    project_id,
  } = student;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-10">
      {/* Student Details */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {student_name}
        </h2>
        <p className="text-sm text-gray-500 text-center">USN: {usn}</p>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Phone:</span>
            <span className="text-gray-800">{student_phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Email:</span>
            <span className="text-gray-800">{student_email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Batch:</span>
            <span className="text-gray-800">{student_batch}</span>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div>
        {!project_id ? (
          <p className="text-center text-gray-600">
            Not registered for a project.
          </p>
        ) : (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Project Details
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Project Name:</span>
                <span className="text-gray-800">
                  {project?.student_project_name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Domain:</span>
                <span className="text-gray-800">
                  {project?.student_project_domain || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Type:</span>
                <span className="text-gray-800">
                  {project?.student_project_type || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Academic Year:</span>
                <span className="text-gray-800">
                  {project?.academic_year || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Guide ID:</span>
                <span className="text-gray-800">
                  {project?.student_project_guide_id || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Faculty Approval:</span>
                <span
                  className={`text-gray-800 font-medium ${
                    project?.faculty_approval_status
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {project?.faculty_approval_status ? "Approved" : "Pending"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Description:</span>
                <p className="text-gray-800 mt-1">
                  {project?.student_project_description || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
