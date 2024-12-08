import React, { useState } from "react";
import { Link } from "react-router";

const StudentSignIn = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    faculty_email: "",
    faculty_password: "",
  });

  // Array of input fields with their respective properties
  const inputFields = [
    {
      id: "faculty_email",
      label: "Email*",
      type: "email",
      placeholder: "mail@loopple.com",
    },
    {
      id: "faculty_password",
      label: "Password*",
      type: "password",
      placeholder: "Enter a password",
    },
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log the data in the desired format
  };

  return (
    <div className="bg-white rounded-lg py-5">
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                onSubmit={handleSubmit}
              >
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Student Sign In</h3>
                <p className="mb-4 text-grey-700"></p>

                {/* Iterate over the inputFields array */}
                {inputFields.map((field, index) => (
                  <div key={index} className="mb-7">
                    <label
                      htmlFor={field.id}
                      className="mb-2 text-sm text-start text-grey-900 block"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id]} // Bind input to state
                      onChange={handleInputChange} // Handle change
                      className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-500"
                >
                  Sign In
                </button>
                <p className="text-sm leading-relaxed text-grey-900">
                  Don't have an account?{' '}
                  <Link to="/student-signup" className="font-bold text-grey-700">
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignIn;
