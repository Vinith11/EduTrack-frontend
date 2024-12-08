import React from "react";

const FacultyProfile = () => {
  const faculty = {
    facultyUid: "123",
    facultyName: "Dr. Vinith Kumar",
    facultyPhone: "9876543210",
    facultyEmail: "vinith.kumar@example.com",
    facultyRole: "Professor",
    facultyPassword: "securepassword123",
  };
  const { facultyName, facultyPhone, facultyEmail } = faculty;

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">{facultyName}</h2>
        <p className="text-sm text-gray-500 mt-1">Faculty Profile</p>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-gray-500 font-medium">Phone:</span>
          <span className="text-gray-800">{facultyPhone}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 font-medium">Email:</span>
          <span className="text-gray-800">{facultyEmail}</span>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
