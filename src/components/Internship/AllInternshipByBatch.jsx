import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../services/config";

const AllInternshipByBatch = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [internships, setInternships] = useState([]);
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
        `${API_BASE_URL}/api/internships/all-by-batch/${selectedYear}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status === 200) {
        setInternships(response.data);
        console.log(response.data);
      } else if (response.status === 404) {
        setInternships([]);
      }
    } catch (err) {
      setError("Failed to fetch internships. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const years = [2021, 2022, 2023, 2024, 2025];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-blue-400 mb-6">
          Filter Internships by Academic Year
        </h1>

        {/* Dropdown and Search Button */}
        <div className="flex flex-col items-center md:flex-row md:justify-center gap-4 mb-6">
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

        {/* Display Loading or Error */}
        {loading && <p className="text-blue-400 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Display Filtered Internships */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {internships.length > 0
            ? internships.map((internship) => (
                <div
                  key={internship.internship_id}
                  className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700 transition-transform transform hover:scale-105"
                >
                  <h2 className="text-2xl font-bold text-green-400 mb-4">
                    {internship.internship_evaluation_sheet || "Unknown Company"}
                  </h2>
                  <h2 className="text-2xl font-bold text-green-400 mb-4">
                    {internship.student_usn }
                  </h2>
                  <p className="text-sm ">
                    <strong>Start Date:</strong> {internship.internship_start}
                  </p>
                  <p className="text-sm ">
                    <strong>End Date:</strong> {internship.internship_end}
                  </p>
                  <p className="text-sm ">
                    <strong>Duration:</strong> {internship.internship_duration}
                  </p>
                  <p className="text-sm ">
                    <strong>Location:</strong> {internship.internship_location}
                  </p>
                  <p className="text-sm ">
                    <strong>Domain:</strong> {internship.internship_domain}
                  </p>
                  <p className="text-sm ">
                    <strong>Certificate:</strong>{" "}
                    {internship.internship_certificate || "Not Provided"}
                  </p>
                  <p className="text-sm ">
                    <strong>Completion Certificate URL:</strong>{" "}
                    {internship.internship_completion_certificate_url ? (
                      <a
                        href={internship.internship_completion_certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        View Certificate
                      </a>
                    ) : (
                      "Not Available"
                    )}
                  </p>
                  <p className="text-sm ">
                    <strong>Faculty UID:</strong>{" "}
                    {internship.faculty_uid || "N/A"}
                  </p>
                </div>
              ))
            : !loading && (
                <p className=" text-center col-span-full">
                  No internships available.
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default AllInternshipByBatch;
