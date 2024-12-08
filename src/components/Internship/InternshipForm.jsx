import React, { useState } from "react";

const InternshipForm = () => {
  const facultyList = [
    {
      facultyUid: "FAC001",
      facultyName: "Dr. A. Sharma",
      facultyPhone: "9876543210",
      facultyEmail: "sharma@example.com",
      facultyRole: "Professor",
      facultyPassword: "password123",
    },
    {
      facultyUid: "FAC002",
      facultyName: "Dr. B. Gupta",
      facultyPhone: "8765432109",
      facultyEmail: "gupta@example.com",
      facultyRole: "Assistant Professor",
      facultyPassword: "password456",
    },
  ];

  const [formData, setFormData] = useState({
    studentUsn: "",
    internshipStart: "",
    internshipEnd: "",
    internshipDuration: "",
    internshipCertificate: "",
    internshipLocation: "",
    internshipDomain: "",
    internshipEvaluationSheet: "",
    internshipCompletionCertificateUrl: "",
    facultyUid: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Internship Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium text-gray-600">Student USN</label>
          <input
            type="text"
            name="studentUsn"
            value={formData.studentUsn}
            onChange={handleChange}
            className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Student USN"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-medium text-gray-600">Start Date</label>
            <input
              type="date"
              name="internshipStart"
              value={formData.internshipStart}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-600">End Date</label>
            <input
              type="date"
              name="internshipEnd"
              value={formData.internshipEnd}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600">Duration</label>
          <input
            type="text"
            name="internshipDuration"
            value={formData.internshipDuration}
            onChange={handleChange}
            className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Duration"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600">Certificate</label>
          <input
            type="text"
            name="internshipCertificate"
            value={formData.internshipCertificate}
            onChange={handleChange}
            className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Certificate Name"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600">Location</label>
          <input
            type="text"
            name="internshipLocation"
            value={formData.internshipLocation}
            onChange={handleChange}
            className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Location"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600">Domain</label>
          <input
            type="text"
            name="internshipDomain"
            value={formData.internshipDomain}
            onChange={handleChange}
            className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Domain"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600">Evaluation Sheet</label>
          <input
            type="text"
            name="internshipEvaluationSheet"
            value={formData.internshipEvaluationSheet}
            onChange={handleChange}
            className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Evaluation Sheet"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600">
            Completion Certificate URL
          </label>
          <input
            type="text"
            name="internshipCompletionCertificateUrl"
            value={formData.internshipCompletionCertificateUrl}
            onChange={handleChange}
            className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter URL"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600">Faculty</label>
          <select
            name="facultyUid"
            value={formData.facultyUid}
            onChange={handleChange}
            className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Faculty</option>
            {facultyList.map((faculty) => (
              <option key={faculty.facultyUid} value={faculty.facultyUid}>
                {faculty.facultyName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InternshipForm;
