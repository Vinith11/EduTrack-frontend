import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../services/config";
import {
  Calendar, MapPin, Globe, Award, FileCheck, Link, UserCheck, BookOpen, Building, Briefcase, PieChart,
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

const DOMAIN_COLORS = {
  "Web/App": "#3b82f6",
  "AI/ML": "#8b5cf6",
  "Blockchain": "#ec4899",
  "IoT": "#f97316",
  "Others": "#6b7280"
};

const AllInternshipByBatch = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [internships, setInternships] = useState([]);
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
        `${API_BASE_URL}/api/internships/all-by-batch/${selectedYear}`,
        {
          headers: { Authorization: `Bearer ${jwt}` }
        }
      );

      if (response.status === 200) {
        setInternships(response.data);
      } else if (response.status === 404) {
        setInternships([]);
      }
    } catch (err) {
      setError("Failed to fetch internships. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getDomainData = () => {
    const domainCounts = internships.reduce((acc, internship) => {
      const domain = internship.internship_domain || "Others";
      acc[domain] = (acc[domain] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(domainCounts).map(([name, value]) => ({ name, value }));
  };

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
    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl p-6 mb-8 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-3">
        <PieChart className="w-6 h-6" /> Domain Distribution
      </h2>
      <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600">
        <ResponsiveContainer width="100%" height={240}>
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

  const years = [2021, 2022, 2023, 2024, 2025];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-blue-400 mb-6">
          Filter Internships by Academic Year
        </h1>

        <div className="flex flex-col items-center md:flex-row md:justify-center gap-4 mb-6">
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
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {internships.length > 0 && renderAnalytics()}

        {internships.length === 0 ? (
          <div className="text-center text-gray-400 flex flex-col items-center gap-3">
            <Building className="w-12 h-12" />
            <p>No internships available.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Rest of the internship cards code remains the same */}
            {internships.map((internship) => (
              <div
                key={internship.internship_id}
                className="bg-gradient-to-br from-gray-800 to-gray-800/50 shadow-lg rounded-xl p-6 border border-gray-700 transition-all hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <UserCheck className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-green-400">
                    {internship.student_usn}
                  </h3>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <Building className="w-6 h-6 text-green-400" />
                  <h4 className="text-lg font-semibold text-green-400">
                    {internship.company_name}
                  </h4>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <div>
                      <p><strong>Start:</strong> {internship.internship_start}</p>
                      <p><strong>End:</strong> {internship.internship_end}</p>
                      <p><strong>Duration:</strong> {internship.internship_duration}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <p><strong>Location:</strong> {internship.internship_location}</p>
                  </div>

                  <div className="flex gap-3">
                    <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <p><strong>Domain:</strong> {internship.internship_domain}</p>
                  </div>

                  <div className="flex gap-3">
                    <Link className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <p>
                      <strong>Completion Certificate:</strong>{" "}
                      {internship.internship_completion_certificate_url ? (
                        <a
                          href={internship.internship_completion_certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline inline-flex items-center gap-1"
                        >
                          View Certificate
                          <FileCheck className="w-4 h-4" />
                        </a>
                      ) : (
                        "Not Available"
                      )}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <BookOpen className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <p><strong>Faculty UID:</strong> {internship.faculty_uid || "N/A"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllInternshipByBatch;