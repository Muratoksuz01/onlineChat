import React, { useContext } from "react";
import { AuthContext } from "../helper/AuthContex";
import { Link } from "react-router-dom";

function Navbar() {
  const { authState, setAuthState } = useContext(AuthContext);

  const logout = () => {
    // Logout işlemi
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Chat App</Link>
        </h1>
        <div>
          {!authState.status ? (
            // Kullanıcı yokken Login ve Register bağlantıları
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md hover:bg-indigo-500 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="ml-4 px-4 py-2 rounded-md hover:bg-indigo-500 transition"
              >
                Register
              </Link>
            </>
          ) : (
            // Kullanıcı giriş yaptıysa kullanıcı adı ve Logout düğmesi
            <div className="flex items-center space-x-4">
              <span>
                Welcome, <strong>{authState.username}</strong>!
              </span>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
