import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../services/config";



const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null); // State to store faculty data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const jwt = useSelector((state) => state.auth.jwt); // Fetch JWT from Redux state

  useEffect(() => {
    const fetchFacultyProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/faculty/users/profile`, {
          headers: {
            Authorization: `Bearer ${jwt}`, // Include JWT in the Authorization header
          },
        });
        console.log(response);
        setFaculty(response.data);
      } catch (err) {
        setError("Failed to fetch faculty profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyProfile();
  }, [jwt]);

  if (loading) {
    return <div className="text-center mt-10">Loading faculty profile...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!faculty) {
    return <div className="text-center mt-10">No faculty profile available.</div>;
  }

  const { faculty_name, faculty_phone, faculty_email } = faculty;

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">{faculty_name}</h2>
        <p className="text-sm text-gray-500 mt-1">Faculty Profile</p>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-gray-500 font-medium">Phone:</span>
          <span className="text-gray-800">{faculty_phone}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 font-medium">Email:</span>
          <span className="text-gray-800">{faculty_email}</span>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
