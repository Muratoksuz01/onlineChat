import React, {  } from "react";
import { Link } from "react-router-dom";

function Navbar() {

  

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold ps-36   mx-auto ">
        Chat App
        </h1>
        <div>
         
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="ml-4 px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Register
              </Link>
            </>
       
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
