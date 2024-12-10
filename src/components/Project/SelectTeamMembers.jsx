import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const sampleStudents = [
  {
    usn: "2GI21CS111",
    student_name: "its 111",
    student_phone: "1111111111",
    student_email: "ia111@goat.com",
    student_batch: "2021",
    project_id: null,
    leader: false,
  },
  {
    usn: "2GI21CS112",
    student_name: "its 112",
    student_phone: "1121111111",
    student_email: "ia112@goat.com",
    student_batch: "2021",
    project_id: null,
    leader: false,
  },
];

const SelectTeamMembers = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Preselected members if any
  const preselectedMembers = location.state?.selected || [];
  const [selectedMembers, setSelectedMembers] = useState(preselectedMembers);

  const toggleMemberSelection = (usn) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(usn)
        ? prevSelected.filter((id) => id !== usn)
        : [...prevSelected, usn]
    );
  };

  const handleConfirmSelection = () => {
    navigate("/project-form", { state: { selected: selectedMembers } });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Team Members</h1>
      <div className="space-y-4">
        {sampleStudents.map((student) => (
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
