import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Formik bileşenleri
import * as Yup from "yup"; // Yup ile doğrulama
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helper/AuthContex";
import { useWebSocket } from '../helper/WebsocketContext';

function Login() {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const { connectWebSocket } = useWebSocket();

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
      .post("http://localhost:8000/api/users/signin", values) // Portu kontrol edin
      .then((response) => {
        console.log("login gelen cevap :", response.data);
        const { token, userId, username ,avatar} = response.data;

        // Kullanıcı verilerini authState'e kaydediyoruz
        setAuthState({ username, id: userId, status: true ,avatar:avatar});
        localStorage.setItem("accessToken", token);
     //  connectWebSocket(response.data.username);

        // Giriş başarılı, yönlendiriyoruz
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login error:", error.response || error.message); // Daha fazla bilgi logla
        alert(error.response?.data?.message || "Failed to login. Please try again.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-2xl shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-300">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
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
              <div className="text-sm text-center">
                <a
                  href="/register"
                  className="font-medium text-blue-200 hover:underline"
                >
                  Don’t have an account? Register here.
                </a>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
  
}

export default Login;
