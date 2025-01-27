import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../services/config";
import {
  Calendar,
  MapPin,
  Globe,
  Award,
  FileCheck,
  Link,
  UserCheck,
  BookOpen,
  Building,
  Briefcase,
} from "lucide-react";


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
        const response = await axios.get(
          `${API_BASE_URL}/api/internships/student/${usn}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setInternships(response.data);
        console.log(response);
        setLoading(false);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching internships."
        );
        setLoading(false);
      }
    };

    fetchInternships();
  }, [jwt]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0f172a] text-gray-100 flex items-center justify-center">
        <div className="animate-spin text-blue-500">
          <Briefcase className="w-8 h-8" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Briefcase className="w-8 h-8 text-blue-400" />
          <h2 className="text-3xl font-bold text-center text-blue-400">
            All Internships
          </h2>
        </div>

        {internships.length === 0 ? (
          <div className="text-center text-gray-400 flex flex-col items-center gap-3">
            <Building className="w-12 h-12" />
            <p>No internships available.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                      <p>
                        <strong>Start:</strong> {internship.internship_start}
                      </p>
                      <p>
                        <strong>End:</strong> {internship.internship_end}
                      </p>
                      <p>
                        <strong>Duration:</strong>{" "}
                        {internship.internship_duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <p>
                      <strong>Location:</strong>{" "}
                      {internship.internship_location}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <p>
                      <strong>Domain:</strong> {internship.internship_domain}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Link className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <p>
                      <strong>Completion Certificate:</strong>{" "}
                      {internship.internship_completion_certificate_url ? (
                        <a
                          href={
                            internship.internship_completion_certificate_url
                          }
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
                    <p>
                      <strong>Faculty UID:</strong>{" "}
                      {internship.faculty_uid || "N/A"}
                    </p>
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

export default AllInternship;
