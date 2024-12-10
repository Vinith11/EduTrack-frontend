import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SnackbarContext } from "../../context/SnackbarProvider";

const sampleGuides = [
  {
    faculty_uid: "100",
    faculty_name: "Zidane",
  },
  {
    faculty_uid: "101",
    faculty_name: "Pele",
  },
  {
    faculty_uid: "102",
    faculty_name: "Zaneti",
  },
  {
    faculty_uid: "103",
    faculty_name: "Vinithkumar",
  },
  {
    faculty_uid: "111",
    faculty_name: "Docker",
  },
  {
    faculty_uid: "FAC001",
    faculty_name: "Dr. Smith",
  },
];

const ProjectForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedTeam = JSON.parse(localStorage.getItem("selectedTeamMembers")) || [];

    const { handleSnackbarOpen } = useContext(SnackbarContext);

  const [formData, setFormData] = useState({
    student_project_name: "",
    academic_year: "",
    student_project_leader_id: "",
    team_members: preselectedTeam,
    student_project_guide_id: "",
    student_project_domain: "",
    student_project_description: "",
    student_project_type: "",
    student_project_report: "",
    student_project_start: "",
    student_project_completion_status: "Pending",
    student_project_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      localStorage.setItem("projectFormData", JSON.stringify(updatedData)); // Save to localStorage
      return updatedData;
    });
  };
  

  const handleSelectTeamMembers = () => {
    navigate("/select-team-members", {
      state: { selected: formData.team_members },
    });
  };

  useEffect(() => {
    // Retrieve project form data from localStorage
    const storedData = localStorage.getItem("projectFormData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  
    // Retrieve team data from localStorage
    const teamData = localStorage.getItem("selectedTeamMembers");
    if (teamData) {
      // Parse the team data and set it in team_members
      const parsedTeamData = JSON.parse(teamData);
      setFormData((prevData) => ({
        ...prevData,
        team_members: parsedTeamData,  // Set the team_members field
      }));
    }
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    localStorage.removeItem("projectFormData");
    localStorage.removeItem("selectedTeamMembers");

    // setMessage("Submitted");
    // handleSnackbarOpen("Submitted", false);
    handleSnackbarOpen("Not submitted Submitted", true);
    navigate("/")
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Project Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            name="student_project_name"
            value={formData.student_project_name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter project name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Academic Year
          </label>
          <input
            type="text"
            name="academic_year"
            value={formData.academic_year}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter academic year"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Leader USN
          </label>
          <input
            type="text"
            name="student_project_leader_id"
            value={formData.student_project_leader_id}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter leader USN"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleSelectTeamMembers}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Select Team Members
          </button>
          <div className="mt-2">
            <strong>Selected Members:</strong>{" "}
            {formData.team_members.join(", ")}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Guide ID
          </label>
          <select
            name="student_project_guide_id"
            value={formData.student_project_guide_id}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select a guide
            </option>
            {sampleGuides.map((guide) => (
              <option key={guide.faculty_uid} value={guide.faculty_uid}>
                {guide.faculty_name} ({guide.faculty_uid})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Domain
          </label>
          <input
            type="text"
            name="student_project_domain"
            value={formData.student_project_domain}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter project domain"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="student_project_description"
            value={formData.student_project_description}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter project description"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <input
            type="text"
            name="student_project_type"
            value={formData.student_project_type}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter project type"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Report URL
          </label>
          <input
            type="text"
            name="student_project_report"
            value={formData.student_project_report}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter report URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="student_project_start"
            value={formData.student_project_start}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project URL
          </label>
          <input
            type="text"
            name="student_project_url"
            value={formData.student_project_url}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter project URL"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
