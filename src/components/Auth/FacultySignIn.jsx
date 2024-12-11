import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setJwt, setFacultyProfile } from "../../redux/slices/authSlice"; // Update with your actual path
import { SnackbarContext } from "../../context/SnackbarProvider";

const FacultySignIn = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    faculty_email: "",
    faculty_password: "",
  });

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSnackbarOpen } = useContext(SnackbarContext);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    // Step 1: Faculty Sign-in
    const signinResponse = await axios.post(
      "http://localhost:5454/auth/faculty/signin",
      {
        email: formData.faculty_email,
        password: formData.faculty_password,
      }
    );
    console.log(signinResponse);

    if (signinResponse.status == 200) {
      const { jwt } = signinResponse.data;

      // Save JWT in Redux and local storage
      dispatch(setJwt(jwt));

      console.log("JWT: ", jwt);
      // Step 2: Fetch Faculty Profile
      const profileResponse = await axios.get(
        "http://localhost:5454/api/faculty/users/profile",
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      const { faculty_uid, faculty_email } = profileResponse.data;
      // Save Faculty Profile in Redux
      dispatch(setFacultyProfile({ faculty_uid, faculty_email }));

      handleSnackbarOpen("Login Successfull", false);

      // Navigate to profile
      navigate("/profile");
    } else{
      const errorMessage = signinResponse.data.error || "An error occurred. Please try again.";
      setError(errorMessage);
      handleSnackbarOpen(errorMessage, true);
    }
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
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  Faculty Sign In
                </h3>
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
                  Don't have an account?{" "}
                  <Link
                    to="/faculty-signup"
                    className="font-bold text-grey-700"
                  >
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

export default FacultySignIn;
