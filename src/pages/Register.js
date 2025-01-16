import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null); // Dosya durumunu tutar

  // Formun başlangıç değerleri
  const initialValues = {
    username: "",
    password: "",
    phone: "",
  };

  // Doğrulama şeması
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),
  });

  // Dosya seçildiğinde dosya durumunu güncelleme
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Form gönderme işlemi
  const onSubmit = (values, { setSubmitting }) => {

    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("phone", values.phone);
    if (file) {
      formData.append("avatar", file);
    }

    axios.post("http://localhost:8000/api/users/signup", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Registration successful!");
    navigate("/login");

  };


  return (
    <div className=" flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-2xl shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-300">Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="">
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-3">
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="my-3">
                <Field
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>

                <input
                  id="avatar"
                  name="avatar"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg
                        cursor-pointer bg-gray-300 dark:text-gray-400 focus:outline-none
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="user_avatar_help" type="file"></input>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
