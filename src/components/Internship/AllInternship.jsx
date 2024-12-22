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
  const usn = useSelector((state) => state.auth.usn);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/internships/student/${usn}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setInternships(response.data);
        console.log(response)
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching internships.");
        setLoading(false);
      }
    };

    fetchInternships();
  }, [jwt]);

  if (loading) {
    return <div className="text-center mt-6 text-blue-400">Loading internships...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-6 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">
          All Internships
        </h2>
        {internships.length === 0 ? (
          <p className="text-center text-gray-400">No internships available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {internships.map((internship) => (
              <div
                key={internship.internship_id}
                className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700 transition-transform transform hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-green-400 mb-4">
                  {internship.student_usn}
                </h3>
                <h3 className="text-2xl font-bold text-green-400 mb-4">
                  {internship.internship_evaluation_sheet}
                </h3>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Start Date:</strong> {internship.internship_start}
                  </p>
                  <p>
                    <strong>End Date:</strong> {internship.internship_end}
                  </p>
                  <p>
                    <strong>Duration:</strong> {internship.internship_duration}
                  </p>
                  <p>
                    <strong>Location:</strong> {internship.internship_location}
                  </p>
                  <p>
                    <strong>Domain:</strong> {internship.internship_domain}
                  </p>
                  <p>
                    <strong>Certificate:</strong> {internship.internship_certificate || "Not Provided"}
                  </p>
                  <p>
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
                  <p>
                    <strong>Faculty UID:</strong> {internship.faculty_uid || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllInternship;
