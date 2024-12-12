import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../services/config";
import { SnackbarContext } from "../../context/SnackbarProvider";
import { useNavigate } from "react-router";


const InternshipForm = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [formData, setFormData] = useState({
    internshipStart: "",
    internshipEnd: "",
    internshipDuration: "",
    internshipCertificate: "",
    internshipLocation: "",
    internshipDomain: "",
    internshipCompletionCertificateUrl: "",
    facultyUid: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const jwt = useSelector((state) => state.auth.jwt);
  const usn = useSelector((state) => state.auth.usn);
  const batch = useSelector((state) => state.auth.batch);

  const navigate = useNavigate();


  const { handleSnackbarOpen } = useContext(SnackbarContext);

  // Get faculty
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/faculty/users/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (response.status === 202) {
          const data = await response.json();
          setFacultyList(data);
        } else {
          throw new Error("Failed to fetch faculty list"); 
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFaculty();
  }, [jwt]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requestData = {
      student_usn: usn,
      academic_year: batch,
      internship_start: formData.internshipStart,
      internship_end: formData.internshipEnd,
      internship_duration: formData.internshipDuration,
      internship_certificate: formData.internshipCertificate,
      internship_location: formData.internshipLocation,
      internship_domain: formData.internshipDomain,
      internship_evaluation_sheet: null,
      internship_completion_certificate_url:
        formData.internshipCompletionCertificateUrl,
      faculty_uid: formData.facultyUid,
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/internships/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.status === 201) {
        const data = await response.json();
        handleSnackbarOpen("Internship created successfully!", false);

        // Navigate to profile
        navigate("/all-internship");
        console.log(data);
      } else {
        handleSnackbarOpen(response.data.error , true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Internship Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
              <option key={faculty.faculty_uid} value={faculty.faculty_uid}>
                {faculty.faculty_name}
              </option>
            ))}
          </select>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default InternshipForm;
