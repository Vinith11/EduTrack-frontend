import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { setJwt, setUserProfile } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SnackbarContext } from "../../context/SnackbarProvider";

const StudentSignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSnackbarOpen } = useContext(SnackbarContext);

  const inputFields = [
    {
      id: "email",
      label: "Email*",
      type: "email",
      placeholder: "mail@loopple.com",
    },
    {
      id: "password",
      label: "Password*",
      type: "password",
      placeholder: "Enter a password",
    },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const response = await axios.post(
      "http://localhost:5454/auth/student/signin",
      formData
    );

    console.log(response);

    if (response.status == 200) {
      const { jwt } = response.data;
      // Dispatch JWT to Redux
      dispatch(setJwt(jwt));

      console.log("JWT:", jwt);

      const profileResponse = await axios.get(
        "http://localhost:5454/api/student/users/profile",
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      const {
        usn,
        student_email: email,
        student_batch: batch,
        project_id,
      } = profileResponse.data;

      // Dispatch profile data to Redux
      dispatch(setUserProfile({ usn, email, batch, project_id }));

      handleSnackbarOpen("Login Successfull", false);

      // Navigate to profile
      navigate("/profile");
    } else {
      const errorMessage =
        response.data.error || "An error occurred. Please try again.";
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
                  Student Sign In
                </h3>

                {error && <p className="text-red-500">{error}</p>}

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
                      value={formData[field.id]}
                      onChange={handleInputChange}
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
                    to="/student-signup"
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

export default StudentSignIn;
