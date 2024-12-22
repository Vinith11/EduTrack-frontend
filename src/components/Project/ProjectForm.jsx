import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../redux/slices/authSlice';
import axios from 'axios';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  Loader2, 
  Send,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';

// Memoized form steps components
const ProjectDetailsForm = memo(({ formData, onInputChange }) => (
  <div className="space-y-6">
    <div className="relative group">
      <FolderKanban className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
      <input
        type="text"
        name="student_project_name"
        placeholder="Project Name"
        value={formData.student_project_name}
        onChange={onInputChange}
        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
      />
    </div>

    <div className="relative group">
      <BookOpen className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
      <input
        type="text"
        name="student_project_domain"
        placeholder="Project Domain"
        value={formData.student_project_domain}
        onChange={onInputChange}
        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
      />
    </div>

    <div className="relative group">
      <ClipboardCheck className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
      <textarea
        name="student_project_description"
        placeholder="Project Description"
        value={formData.student_project_description}
        onChange={onInputChange}
        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70 min-h-32"
      />
    </div>

    <div className="relative group">
      <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
      <input
        type="date"
        name="student_project_start"
        value={formData.student_project_start}
        onChange={onInputChange}
        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-700/70"
      />
    </div>
  </div>
));

const TeamSelection = memo(({ students, formData, onToggleMember }) => (
  <div className="space-y-4">
    <div className="grid gap-4">
      {students.map(student => (
        <motion.div
          key={student.usn}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 flex items-center justify-between"
        >
          <div>
            <p className="text-lg font-medium text-gray-200">{student.student_name}</p>
            <p className="text-sm text-gray-400">{student.usn}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => onToggleMember(student.usn)}
            className={`px-4 py-2 rounded-lg ${
              formData.team_members.includes(student.usn)
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
          >
            {formData.team_members.includes(student.usn) ? 'Remove' : 'Add'}
          </motion.button>
        </motion.div>
      ))}
    </div>
  </div>
));

const GuideSelection = memo(({ guides, formData, onToggleGuide }) => (
  <div className="space-y-4">
    <div className="grid gap-4">
      {guides.map(guide => (
        <motion.div
          key={guide.faculty_uid}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 flex items-center justify-between"
        >
          <div>
            <p className="text-lg font-medium text-gray-200">{guide.faculty_name}</p>
            <p className="text-sm text-gray-400">{guide.faculty_uid}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => onToggleGuide(guide.faculty_uid)}
            className={`px-4 py-2 rounded-lg ${
              formData.student_project_guide_id === guide.faculty_uid
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
          >
            {formData.student_project_guide_id === guide.faculty_uid ? 'Remove' : 'Select'}
          </motion.button>
        </motion.div>
      ))}
    </div>
  </div>
));

const ProjectConfirmation = memo(({ formData, onSubmit, loading }) => (
  <div className="space-y-6">
    <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-2">Project Details</h3>
          <div className="space-y-2 text-gray-300">
            <p><span className="font-medium text-gray-200">Name:</span> {formData.student_project_name}</p>
            <p><span className="font-medium text-gray-200">Domain:</span> {formData.student_project_domain}</p>
            <p><span className="font-medium text-gray-200">Description:</span> {formData.student_project_description}</p>
            <p><span className="font-medium text-gray-200">Start Date:</span> {formData.student_project_start}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-2">Team Information</h3>
          <div className="space-y-2 text-gray-300">
            <p><span className="font-medium text-gray-200">Project Leader:</span> {formData.student_project_leader_id}</p>
            <div>
              <span className="font-medium text-gray-200">Team Members:</span>
              <ul className="mt-1 space-y-1">
                {formData.team_members.map(usn => (
                  <li key={usn} className="ml-4">• {usn}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-2">Guide Information</h3>
          <p className="text-gray-300">
            <span className="font-medium text-gray-200">Selected Guide:</span> {formData.student_project_guide_id}
          </p>
        </div>
      </div>
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={onSubmit}
      disabled={loading}
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Send className="w-5 h-5" />
      )}
      {loading ? "Creating Project..." : "Confirm & Submit"}
    </motion.button>
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

  const steps = [
    { title: 'Project Details', icon: FolderKanban },
    { title: 'Team', icon: Users },
    { title: 'Guide', icon: GraduationCap },
    { title: 'Confirm', icon: ClipboardCheck }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700/50">
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="inline-block"
            >
              <FolderKanban className="w-20 h-20 text-blue-500 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Create Project
            </h2>
            <p className="text-gray-400 mt-2">Fill in your project details step by step</p>
          </div>
  
          <div className="mb-12 flex justify-between items-center relative">
            {/* Progress bar background */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 transform -translate-y-1/2" />
            
            {/* Active progress bar */}
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2 transition-all duration-300"
              style={{ width: `${(activeStep / 3) * 100}%` }}
            />
            
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    index === activeStep
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : index < activeStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-400'
                  } transition-all duration-300 shadow-lg`}
                >
                  <step.icon className="w-6 h-6" />
                </motion.div>
                <span className={`mt-2 text-sm font-medium ${
                  index === activeStep ? 'text-blue-400' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>
  
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 backdrop-blur-xl shadow-xl">
            {renderStepContent()}
  
            {activeStep !== 3 && (
              <div className="mt-8 flex justify-between gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  disabled={activeStep === 0}
                  className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setActiveStep(prev => Math.min(3, prev + 1))}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectStepperForm;