import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../redux/slices/authSlice';
import axios from 'axios';

// Memoized form steps components
const ProjectDetailsForm = memo(({ formData, onInputChange }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold mb-4">Project Details</h2>
    <div>
      <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
        Project Name
      </label>
      <input
        id="project-name"
        type="text"
        name="student_project_name"
        value={formData.student_project_name}
        onChange={onInputChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      />
    </div>

    <div>
      <label htmlFor="project-domain" className="block text-sm font-medium text-gray-700">
        Domain
      </label>
      <input
        id="project-domain"
        type="text"
        name="student_project_domain"
        value={formData.student_project_domain}
        onChange={onInputChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      />
    </div>

    <div>
      <label htmlFor="project-description" className="block text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        id="project-description"
        name="student_project_description"
        value={formData.student_project_description}
        onChange={onInputChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32"
      />
    </div>

    <div>
      <label htmlFor="project-start" className="block text-sm font-medium text-gray-700">
        Start Date
      </label>
      <input
        id="project-start"
        type="date"
        name="student_project_start"
        value={formData.student_project_start}
        onChange={onInputChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      />
    </div>
  </div>
));

const TeamSelection = memo(({ students, formData, onToggleMember }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold mb-4">Select Team Members</h2>
    <div className="space-y-2">
      {students.map(student => (
        <div key={student.usn} className="flex items-center justify-between p-2 border rounded">
          <div>
            <p className="font-medium">{student.student_name}</p>
            <p className="text-sm text-gray-600">{student.usn}</p>
          </div>
          <button
            type="button"
            onClick={() => onToggleMember(student.usn)}
            className={`px-3 py-1 rounded ${
              formData.team_members.includes(student.usn)
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            {formData.team_members.includes(student.usn) ? 'Remove' : 'Add'}
          </button>
        </div>
      ))}
    </div>
  </div>
));

const GuideSelection = memo(({ guides, formData, onToggleGuide }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold mb-4">Select Project Guide</h2>
    <div className="space-y-2">
      {guides.map(guide => (
        <div key={guide.faculty_uid} className="flex items-center justify-between p-2 border rounded">
          <div>
            <p className="font-medium">{guide.faculty_name}</p>
            <p className="text-sm text-gray-600">{guide.faculty_uid}</p>
          </div>
          <button
            type="button"
            onClick={() => onToggleGuide(guide.faculty_uid)}
            className={`px-3 py-1 rounded ${
              formData.student_project_guide_id === guide.faculty_uid
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            {formData.student_project_guide_id === guide.faculty_uid ? 'Remove' : 'Select'}
          </button>
        </div>
      ))}
    </div>
  </div>
));

const ProjectConfirmation = memo(({ formData, onSubmit, loading }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold mb-4">Confirm Project Details</h2>
    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
      <div>
        <h3 className="font-medium text-gray-700">Project Details</h3>
        <p><span className="font-medium">Name:</span> {formData.student_project_name}</p>
        <p><span className="font-medium">Domain:</span> {formData.student_project_domain}</p>
        <p><span className="font-medium">Description:</span> {formData.student_project_description}</p>
        <p><span className="font-medium">Start Date:</span> {formData.student_project_start}</p>
      </div>
      
      <div>
        <h3 className="font-medium text-gray-700">Team Information</h3>
        <p><span className="font-medium">Project Leader:</span> {formData.student_project_leader_id}</p>
        <div>
          <span className="font-medium">Team Members:</span>
          <ul className="list-disc pl-5 mt-1">
            {formData.team_members.map(usn => (
              <li key={usn}>{usn}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-700">Guide Information</h3>
        <p><span className="font-medium">Selected Guide:</span> {formData.student_project_guide_id}</p>
      </div>
    </div>
    <button
      type="button"
      onClick={onSubmit}
      disabled={loading}
      className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400"
    >
      {loading ? 'Creating Project...' : 'Confirm & Submit'}
    </button>
  </div>
));

const ProjectStepperForm = () => {
  const dispatch = useDispatch();
  const { jwt, usn, email, batch } = useSelector((state) => state.auth);
  const [activeStep, setActiveStep] = useState(0);
  const [students, setStudents] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    student_project_name: '',
    academic_year: batch,
    student_project_leader_id: usn,
    team_members: [],
    student_project_guide_id: '',
    student_project_domain: '',
    student_project_description: '',
    student_project_type: null,
    student_project_report: null,
    student_project_start: '',
    student_project_completion_status: 'Pending',
    student_project_url: null
  });

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch(
          "http://localhost:5454/api/faculty/users/all",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );
        if (response.status === 202) {
          const data = await response.json();
          setGuides(data);
        }
      } catch (error) {
        console.error('Failed to fetch guides:', error);
      }
    };
    fetchGuides();
  }, [jwt]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5454/api/projects/available-students/${batch}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const filteredStudents = response.data.filter(student => student.usn !== usn);
        setStudents(filteredStudents);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };
    fetchStudents();
  }, [jwt, batch, usn]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleMember = (usn) => {
    setFormData(prev => ({
      ...prev,
      team_members: prev.team_members.includes(usn)
        ? prev.team_members.filter(id => id !== usn)
        : [...prev.team_members, usn]
    }));
  };

  const handleToggleGuide = (guideId) => {
    setFormData(prev => ({
      ...prev,
      student_project_guide_id: prev.student_project_guide_id === guideId ? '' : guideId
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5454/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUserProfile({ jwt, email, batch, project_id: data.project_id }));
        alert('Project created successfully!');
      }
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Failed to create project');
    }
    setLoading(false);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <ProjectDetailsForm formData={formData} onInputChange={handleInputChange} />;
      case 1:
        return <TeamSelection students={students} formData={formData} onToggleMember={handleToggleMember} />;
      case 2:
        return <GuideSelection guides={guides} formData={formData} onToggleGuide={handleToggleGuide} />;
      case 3:
        return <ProjectConfirmation formData={formData} onSubmit={handleSubmit} loading={loading} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        {['Project Details', 'Team', 'Guide', 'Confirm'].map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === activeStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-sm">{step}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {renderStepContent()}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          {activeStep < 3 && (
            <button
              type="button"
              onClick={() => setActiveStep(prev => Math.min(3, prev + 1))}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectStepperForm;