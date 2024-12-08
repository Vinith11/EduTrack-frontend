import React, { useState } from "react";

const ProjectBatch = () => {
  // Sample data
  const data = [
    {
      projectId: 1,
      studentProjectName: "AI Chatbot",
      academicYear: "2021",
      studentProjectLeaderId: "STU123",
      teamMembers: ["STU124", "STU125"],
      studentProjectGuideId: "FAC001",
      studentProjectDomain: "Artificial Intelligence",
      studentProjectDescription:
        "An AI chatbot to assist with customer queries.",
      studentProjectType: "Research",
      studentProjectReport: "report_ai_chatbot.pdf",
      studentProjectStart: "2024-12-08",
      studentProjectCompletionStatus: "In Progress",
      studentProjectUrl: "http://example.com/ai-chatbot",
      facultyApprovalStatus: true,
    },
    {
      projectId: 2,
      studentProjectName: "E-commerce Website",
      academicYear: "2022",
      studentProjectLeaderId: "STU126",
      teamMembers: ["STU127", "STU128"],
      studentProjectGuideId: "FAC002",
      studentProjectDomain: "Web Development",
      studentProjectDescription: "An e-commerce platform for local businesses.",
      studentProjectType: "Development",
      studentProjectReport: "report_ecommerce.pdf",
      studentProjectStart: "2024-12-10",
      studentProjectCompletionStatus: "Pending",
      studentProjectUrl: "http://example.com/ecommerce",
      facultyApprovalStatus: true,
    },
    {
      projectId: 2,
      studentProjectName: "E-commerce Website",
      academicYear: "2022",
      studentProjectLeaderId: "STU126",
      teamMembers: ["STU127", "STU128"],
      studentProjectGuideId: "FAC002",
      studentProjectDomain: "Web Development",
      studentProjectDescription: "An e-commerce platform for local businesses.",
      studentProjectType: "Development",
      studentProjectReport: "report_ecommerce.pdf",
      studentProjectStart: "2024-12-10",
      studentProjectCompletionStatus: "Pending",
      studentProjectUrl: "http://example.com/ecommerce",
      facultyApprovalStatus: true,
    },
    {
      projectId: 2,
      studentProjectName: "E-commerce Website",
      academicYear: "2022",
      studentProjectLeaderId: "STU126",
      teamMembers: ["STU127", "STU128"],
      studentProjectGuideId: "FAC002",
      studentProjectDomain: "Web Development",
      studentProjectDescription: "An e-commerce platform for local businesses.",
      studentProjectType: "Development",
      studentProjectReport: "report_ecommerce.pdf",
      studentProjectStart: "2024-12-10",
      studentProjectCompletionStatus: "Pending",
      studentProjectUrl: "http://example.com/ecommerce",
      facultyApprovalStatus: true,
    },
    {
      projectId: 2,
      studentProjectName: "E-commerce Website",
      academicYear: "2022",
      studentProjectLeaderId: "STU126",
      teamMembers: ["STU127", "STU128"],
      studentProjectGuideId: "FAC002",
      studentProjectDomain: "Web Development",
      studentProjectDescription: "An e-commerce platform for local businesses.",
      studentProjectType: "Development",
      studentProjectReport: "report_ecommerce.pdf",
      studentProjectStart: "2024-12-10",
      studentProjectCompletionStatus: "Pending",
      studentProjectUrl: "http://example.com/ecommerce",
      facultyApprovalStatus: true,
    },
    {
      projectId: 3,
      studentProjectName: "Health Tracker App",
      academicYear: "2023",
      studentProjectLeaderId: "STU129",
      teamMembers: ["STU130", "STU131"],
      studentProjectGuideId: "FAC003",
      studentProjectDomain: "Mobile Development",
      studentProjectDescription:
        "A health tracker app for monitoring fitness goals.",
      studentProjectType: "Development",
      studentProjectReport: "report_health_tracker.pdf",
      studentProjectStart: "2024-12-15",
      studentProjectCompletionStatus: "Not Started",
      studentProjectUrl: "http://example.com/health-tracker",
      facultyApprovalStatus: true,
    },
  ];

  const [selectedYear, setSelectedYear] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  const handleFilter = () => {
    const result = data.filter(
      (project) => project.academicYear === selectedYear
    );
    setFilteredProjects(result);
  };

  const years = [2021, 2022, 2023, 2024];

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Filter Projects by Academic Year
      </h1>

      {/* Dropdown and Search Button */}
      <div className="flex flex-col items-center md:flex-row md:justify-center gap-4 mb-6">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full md:w-64"
        >
          <option value="" disabled>
            Select Academic Year
          </option>
          {years.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Display Filtered Projects */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.projectId}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {project.studentProjectName}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Leader ID:</strong> {project.studentProjectLeaderId}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Domain:</strong> {project.studentProjectDomain}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Description:</strong>{" "}
                {project.studentProjectDescription}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Start Date:</strong> {project.studentProjectStart}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong>{" "}
                {project.studentProjectCompletionStatus}
              </p>
              <a
                href={project.studentProjectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 block"
              >
                View Project
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No projects available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectBatch;
