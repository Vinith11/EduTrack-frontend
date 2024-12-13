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

      console.log(response);

      if (response.status === 200) {
        setInternships(response.data);
      } else if (response.status === 404) {
        setInternships([]);
      }
    } catch (err) {
      setError("Failed to fetch projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const years = [2021, 2022, 2023];

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
      {internships.length === 0 ? (
        <p className="text-center text-gray-600">No internships available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <div
              key={internship.internship_id}
              className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                {internship.student_usn}
              </h3>
              <div className="text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold">Start Date:</span>{" "}
                  {internship.internship_start}
                </p>
                <p>
                  <span className="font-semibold">End Date:</span>{" "}
                  {internship.internship_end}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span>{" "}
                  {internship.internship_duration}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {internship.internship_location}
                </p>
                <p>
                  <span className="font-semibold">Domain:</span>{" "}
                  {internship.internship_domain}
                </p>
                <p>
                  <span className="font-semibold">Certificate:</span>{" "}
                  {internship.internship_certificate || "Not Provided"}
                </p>
                <p>
                  <span className="font-semibold">
                    Completion Certificate URL:
                  </span>{" "}
                  {internship.internship_completion_certificate_url ? (
                    <a
                      href={internship.internship_completion_certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Certificate
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </p>
                <p>
                  <span className="font-semibold">Faculty UID:</span>{" "}
                  {internship.faculty_uid || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllInternshipByBatch;
