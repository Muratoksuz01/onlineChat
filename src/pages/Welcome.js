import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-2xl font-bold text-center">Welcome to Our Site!</h2>
        <p className="text-center text-gray-600">
          Please log in or register to access your account and start using our services.
        </p>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
