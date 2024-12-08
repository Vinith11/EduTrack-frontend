import React from "react";

const StudentProfile = () => {
  const student = {
    usn: "STU001",
    studentName: "Rohan Sharma",
    studentPhone: "9876543210",
    studentEmail: "rohan.sharma@example.com",
    studentBatch: "2023",
    studentPassword: "securepassword123",
    projectId: 358,
    leader: true,
  };

  const project = {
    project_id: 358,
    student_project_name: "AI Research",
    academic_year: "2023",
    student_project_leader_id: "STU001",
    team_members: ["STU002"],
    student_project_guide_id: "FAC001",
    student_project_domain: "AI",
    student_project_description: "Research on AI advancements.",
    student_project_type: "Research",
    student_project_report: null,
    student_project_start: null,
    student_project_completion_status: null,
    student_project_url: null,
    faculty_approval_status: false,
  };

  const {
    usn,
    studentName,
    studentPhone,
    studentEmail,
    studentBatch,
    projectId,
  } = student;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-10">
      {/* Student Details */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {studentName}
        </h2>
        <p className="text-sm text-gray-500 text-center">USN: {usn}</p>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Phone:</span>
            <span className="text-gray-800">{studentPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Email:</span>
            <span className="text-gray-800">{studentEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Batch:</span>
            <span className="text-gray-800">{studentBatch}</span>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div>
        {projectId === 0 || projectId === null ? (
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
                  {project.student_project_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Domain:</span>
                <span className="text-gray-800">
                  {project.student_project_domain}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Type:</span>
                <span className="text-gray-800">
                  {project.student_project_type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">
                  Academic Year:
                </span>
                <span className="text-gray-800">{project.academic_year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Guide ID:</span>
                <span className="text-gray-800">
                  {project.student_project_guide_id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">
                  Faculty Approval:
                </span>
                <span
                  className={`text-gray-800 font-medium ${
                    project.faculty_approval_status
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {project.faculty_approval_status ? "Approved" : "Pending"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Description:</span>
                <p className="text-gray-800 mt-1">
                  {project.student_project_description}
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
