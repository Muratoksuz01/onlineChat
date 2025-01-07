import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Formik bileşenleri
import * as Yup from "yup"; // Yup ile doğrulama
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../helper/AuthContex"

function Login() {
  const navigate = useNavigate();
  const {setAuthState}=useContext(AuthContext)
  // Formun başlangıç değerleri
  const initialValues = {
    username: "murat",
    password: "1234",
  };

  // Doğrulama şeması
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  });

  // Form gönderme işlemi
  const onSubmit = (values) => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        const users = response.data;

        // Gönderilen username ve password ile eşleşme kontrolü
        const user = users.find(
          (u) => u.username === values.username && u.password === values.password
        );

        if (user) {
          setAuthState({ username: user.username, id: user.id, status: true }); // Kullanıcı bilgisini kaydet
          navigate("/"); // Ana sayfaya yönlendir
        } else {
          alert("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Failed to login. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center">
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              register a new account
            </a>
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Username"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>
  );
}

export default Login;
