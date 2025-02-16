import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../services/config";
import { 
  PieChart as PieChartIcon, 
  FileSearch, 
  Users, 
  Calendar,
  CheckCircle2,
  Clock,
  Folder,
  ChartPie
} from "lucide-react";
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
  Pending: "#ef4444",
};

const DOMAIN_COLORS = {
  "Web/App": "#3b82f6",
  "AI/ML": "#8b5cf6",
  "Blockchain": "#ec4899",
  "IoT": "#f97316",
  "Others": "#6b7280"
};

const AllProjectBatch = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const status = project.student_project_completion_status === "Completed" ? "Completed" : "Pending";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  };

  const getDomainData = () => {
    const domainCounts = filteredProjects.reduce((acc, project) => {
      const domain = project.student_project_domain;
      acc[domain] = (acc[domain] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(domainCounts).map(([name, value]) => ({ name, value }));
  };

  const years = [2021, 2022, 2023, 2024, 2025];

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0f172a] text-gray-100 flex items-center justify-center">
        <div className="animate-spin text-blue-500">
          <ChartPie className="w-8 h-8" />
        </div>
      </div>
    );
  }


  const renderAnalytics = () => (
    <div className="grid md:grid-cols-2 gap-6 bg-gray-800 rounded-xl border border-gray-700 shadow-xl p-6 mb-8 max-w-5xl mx-auto">
      <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-400" /> Project Status
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <RechartsPieChart>
            <Pie
              data={getStatusData()}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {getStatusData().map((entry) => (
                <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Folder className="w-5 h-5 text-blue-400" /> Domain Distribution
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <RechartsPieChart>
            <Pie
              data={getDomainData()}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {getDomainData().map((entry) => (
                <Cell key={entry.name} fill={DOMAIN_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-blue-400 mb-6 flex items-center justify-center gap-2">
          <Calendar className="w-6 h-6" />
          Filter Projects by Academic Year
        </h1>

        <div className="flex flex-col items-center md:flex-row md:justify-center gap-4 mb-8">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
          >
            <option value="" disabled>Select Academic Year</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>{year}</option>
            ))}
          </select>
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <FileSearch className="w-4 h-4" />
            Search
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        {filteredProjects.length > 0 && renderAnalytics()}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.project_id}
              className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700 transition-transform hover:scale-105 flex flex-col"
            >
              <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                <Folder className="w-5 h-5" />
                {project.student_project_name}
              </h2>
              <div className="space-y-3 mb-4">
                <p className="text-sm"><span className="font-semibold">Leader ID:</span> {project.student_project_leader_id}</p>
                <p className="text-sm"><span className="font-semibold">Domain:</span> {project.student_project_domain}</p>
                <p className="text-sm"><span className="font-semibold">Description:</span> {project.student_project_description}</p>
                <p className="text-sm"><span className="font-semibold">Start Date:</span> {project.student_project_start}</p>
                <p className="text-sm">
                  <span className="font-semibold">Status:</span> 
                  <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 inline-flex ${
                    project.student_project_completion_status === 'Completed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {project.student_project_completion_status === 'Completed' 
                      ? <CheckCircle2 className="w-3 h-3" />
                      : <Clock className="w-3 h-3" />
                    }
                    {project.student_project_completion_status === 'Completed' ? 'Completed' : 'Pending'}
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
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Team Members:
                </h4>
                {project.team_members && project.team_members.length > 0 ? (
                  <ul className="space-y-2">
                    {project.team_members.map((member, index) => (
                      <li key={index} className="text-sm bg-gray-700/50 px-3 py-2 rounded-lg">
                        {member}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm">No team members available.</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {!loading && filteredProjects.length === 0 && (
          <p className="text-center">No projects available.</p>
        )}
      </div>
    </div>
  );
};

export default AllProjectBatch;