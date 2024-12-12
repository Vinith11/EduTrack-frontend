import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../services/config";


const AllInternship = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get JWT from Redux state
  const jwt = useSelector((state) => state.auth.jwt);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/internships/all`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setInternships(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching internships.");
        setLoading(false);
      }
    };

    fetchInternships();
  }, [jwt]);

  if (loading) {
    return <div className="text-center mt-6">Loading internships...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-6 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        All Internships
      </h2>
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

export default AllInternship;
