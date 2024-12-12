import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../services/config";


const SelectTeamMembers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Preselected members if any
  const preselectedMembers = location.state?.selected || [];
  const [selectedMembers, setSelectedMembers] = useState(preselectedMembers);

  // Fetch JWT and batch from the Redux store
  const { jwt, batch } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!jwt || !batch) {
      setError("JWT or batch is missing. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/projects/available-students/${batch}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setStudents(response.data);
      } catch (err) {
        setError("Failed to fetch students. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [jwt, batch]);

  const toggleMemberSelection = (usn) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(usn)
        ? prevSelected.filter((id) => id !== usn)
        : [...prevSelected, usn]
    );
  };

  const handleConfirmSelection = () => {
    localStorage.setItem("selectedTeamMembers", JSON.stringify(selectedMembers));
    navigate("/project-form");
  };

  if (loading) {
    return <div className="text-center py-6">Loading students...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Team Members</h1>
      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.usn}
            className="flex items-center justify-between border-b py-2"
          >
            <div>
              <p className="text-lg font-medium">{student.student_name}</p>
              <p className="text-sm text-gray-500">{student.usn}</p>
            </div>
            <button
              onClick={() => toggleMemberSelection(student.usn)}
              className={`px-4 py-2 rounded-md ${
                selectedMembers.includes(student.usn)
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {selectedMembers.includes(student.usn) ? "Remove" : "Add"}
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleConfirmSelection}
        className="mt-6 w-full px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Confirm Selection
      </button>
    </div>
  );
};

export default SelectTeamMembers;
