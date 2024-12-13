import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../services/config";


const AllProjectBatch = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Access JWT and faculty_uid from Redux state
  const { jwt, faculty_uid } = useSelector((state) => state.auth);

  const handleFilter = async () => {
    if (!selectedYear) {
      setError("Please select an academic year.");
      return;
    }
    if (!jwt || !faculty_uid) {
      setError("Authentication details are missing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/projects/${selectedYear}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status === 200) {
        setFilteredProjects(response.data);
      }
    } catch (err) {
      setError("Failed to fetch projects. Please try again later.");
    } finally {
      setLoading(false);
    }
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

      {/* Display Loading or Error */}
      {loading && <p className="text-blue-600 text-center">Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* Display Filtered Projects */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.project_id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {project.student_project_name}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Leader ID:</strong> {project.student_project_leader_id}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Domain:</strong> {project.student_project_domain}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Description:</strong>{" "}
                {project.student_project_description}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Start Date:</strong> {project.student_project_start}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong>{" "}
                {project.student_project_completion_status}
              </p>
              <a
                href={project.student_project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 block"
              >
                View Project
              </a>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-gray-600 text-center col-span-full">
              No projects available.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default AllProjectBatch;
