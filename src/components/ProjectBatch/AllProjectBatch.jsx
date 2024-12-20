import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../services/config";
import { PieChart } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const STATUS_COLORS = {
  Completed: "#22c55e",
  Ongoing: "#eab308",
  "Yet to Start": "#ef4444",
  "Not Evaluated": "#94a3b8",
};



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

  const getStatusData = () => {
    const statusCounts = filteredProjects.reduce((acc, project) => {
      const status = project.student_project_completion_status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(statusCounts).map((key) => ({
      name: key,
      value: statusCounts[key],
    }));
  };

  const years = [2021, 2022, 2023, 2024, 2025];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-blue-400 mb-6">
          Filter Projects by Academic Year
        </h1>

        <div className="flex flex-col items-center md:flex-row md:justify-center gap-4 mb-8">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
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
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-blue-400 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        {filteredProjects.length > 0 && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl p-6 mb-8 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-3">
              <PieChart className="w-6 h-6 text-blue-400" /> Project Analytics
            </h2>
            <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-400" /> Project Status
                Distribution
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <RechartsPieChart>
                  <Pie
                    data={getStatusData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {getStatusData().map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          STATUS_COLORS[entry.name] ||
                          `#${Math.floor(Math.random() * 16777215).toString(
                            16
                          )}`
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.length > 0
            ? filteredProjects.map((project) => (
                <div
                  key={project.project_id}
                  className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700 transition-transform hover:scale-105 flex flex-col"
                >
                  <h2 className="text-lg font-semibold text-blue-400 mb-4">
                    {project.student_project_name}
                  </h2>
                  <div className="space-y-3 mb-4">
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">Leader ID:</span>{" "}
                      {project.student_project_leader_id}
                    </p>
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">Domain:</span>{" "}
                      {project.student_project_domain}
                    </p>
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">Description:</span>{" "}
                      {project.student_project_description}
                    </p>
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">Start Date:</span>{" "}
                      {project.student_project_start}
                    </p>
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">Status:</span>{" "}
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          project.student_project_completion_status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                          project.student_project_completion_status === 'Ongoing' ? 'bg-yellow-500/20 text-yellow-400' :
                          project.student_project_completion_status === 'Yet to Start' ? 'bg-red-500/20 text-red-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {project.student_project_completion_status}
                      </span>
                    </p>
                  </div>

                  <a
                    href={project.student_project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline mb-4 inline-block"
                  >
                    View Project
                  </a>

                  <div className="mt-auto pt-4 border-t border-gray-700">
                    <h4 className="text-blue-400 font-semibold mb-2">Team Members:</h4>
                    {project.team_members && project.team_members.length > 0 ? (
                      <ul className="space-y-2">
                        {project.team_members.map((member, index) => (
                          <li key={index} className="text-sm text-gray-400 bg-gray-700/50 px-3 py-2 rounded-lg">
                            {member}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-400">
                        No team members available.
                      </p>
                    )}
                  </div>
                </div>
              ))
            : !loading && (
                <p className="text-gray-400 text-center col-span-full">
                  No projects available.
                </p>
              )}
        </div>

        {!loading && filteredProjects.length === 0 && (
          <p className="text-gray-400 text-center">No projects available.</p>
        )}
      </div>
    </div>
  );
};

export default AllProjectBatch;
