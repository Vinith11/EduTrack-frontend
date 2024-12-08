import React from "react";

const AllInternship = () => {
  const internships = [
    {
      internshipId: 1,
      studentUsn: "STU123",
      internshipStart: "2024-12-08",
      internshipEnd: "2025-01-08",
      internshipDuration: "1 month",
      internshipCertificate: "Certificate of Completion",
      internshipLocation: "Remote",
      internshipDomain: "Web Development",
      internshipEvaluationSheet: "Evaluation_Sheet_123.pdf",
      internshipCompletionCertificateUrl: "https://example.com/certificate",
      facultyUid: "FAC001",
    },
    {
      internshipId: 2,
      studentUsn: "STU124",
      internshipStart: "2024-11-01",
      internshipEnd: "2025-02-01",
      internshipDuration: "3 months",
      internshipCertificate: null,
      internshipLocation: "On-site",
      internshipDomain: "Data Science",
      internshipEvaluationSheet: null,
      internshipCompletionCertificateUrl: null,
      facultyUid: "FAC002",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        All Internships
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((internship) => (
          <div
            key={internship.internshipId}
            className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
          >
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              {internship.studentUsn}
            </h3>
            <div className="text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Start Date:</span>{" "}
                {internship.internshipStart}
              </p>
              <p>
                <span className="font-semibold">End Date:</span>{" "}
                {internship.internshipEnd}
              </p>
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {internship.internshipDuration}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {internship.internshipLocation}
              </p>
              <p>
                <span className="font-semibold">Domain:</span>{" "}
                {internship.internshipDomain}
              </p>
              <p>
                <span className="font-semibold">Certificate:</span>{" "}
                {internship.internshipCertificate || "Not Provided"}
              </p>
              <p>
                <span className="font-semibold">Evaluation Sheet:</span>{" "}
                {internship.internshipEvaluationSheet || "Not Uploaded"}
              </p>
              <p>
                <span className="font-semibold">
                  Completion Certificate URL:
                </span>{" "}
                {internship.internshipCompletionCertificateUrl ? (
                  <a
                    href={internship.internshipCompletionCertificateUrl}
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
                {internship.facultyUid}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllInternship;
