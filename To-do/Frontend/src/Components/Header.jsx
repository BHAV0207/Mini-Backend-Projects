import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ user }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userId");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-3xl font-bold">
          {user ? `${user.name}'s To-Do List` : "Loading..."}
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={handleLogOut}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
