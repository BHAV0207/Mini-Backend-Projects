import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage({ setUserId }) {
  let navigate = useNavigate();
  let [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  let [err, setErr] = useState("");
  let [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formValues.email,
        password: formValues.password,
      });
      const { id } = res.data;
      setUserId(id);
      localStorage.setItem("userId", id);
      setSuccess("Login successful! Redirecting...");
      setErr("");

      setTimeout(() => {
        navigate("/home");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setErr(err.response?.data?.message || "Login failed");
      setSuccess("");
    }
  };

  return (
    <div className="bg-gray-900 w-screen h-screen font-mono text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formValues.email}
              name="email"
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formValues.password}
              name="password"
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {err && <p className="text-red-500 text-sm mb-4">{err}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 rounded-md text-white font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

          <p className="text-sm text-gray-400 mt-4 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Register Here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
