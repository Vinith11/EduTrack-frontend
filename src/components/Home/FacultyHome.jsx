

const FacultyHome = () => {
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
        studentProjectDescription: "An AI chatbot to assist with customer queries.",
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
        projectId: 3,
        studentProjectName: "Health Tracker App",
        academicYear: "2023",
        studentProjectLeaderId: "STU129",
        teamMembers: ["STU130", "STU131"],
        studentProjectGuideId: "FAC003",
        studentProjectDomain: "Mobile Development",
        studentProjectDescription: "A health tracker app for monitoring fitness goals.",
        studentProjectType: "Development",
        studentProjectReport: "report_health_tracker.pdf",
        studentProjectStart: "2024-12-15",
        studentProjectCompletionStatus: "Not Started",
        studentProjectUrl: "http://example.com/health-tracker",
        facultyApprovalStatus: true,
      },
    ];
  
    return (
      <div className="p-6 min-h-screen">
        <h1 className="text-2xl font-bold text-center mb-6">
          Project status
        </h1>
  
        {/* Display Projects */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.length > 0 ? (
            data.map((project) => (
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
                  <strong>Description:</strong> {project.studentProjectDescription}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Start Date:</strong> {project.studentProjectStart}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong> {project.studentProjectCompletionStatus}
                </p>
              </div>
            ))
          ) : (
            <p className="text-2xl font-bold text-center col-span-full text-gray-800">
              No Projects Available
            </p>
          )}
        </div>
      </div>
    );
  };
  
  
  export default FacultyHome;