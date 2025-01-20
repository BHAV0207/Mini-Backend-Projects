import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({user}) {
  console.log(user);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userId");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  


  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold"> {user ? `${user.name}'s To-Do List` : "Loading..."}</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <span
                onClick={handleLogOut}
                href="#"
                className="hover:text-blue-300 transition duration-300"
              >
                Logout
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
