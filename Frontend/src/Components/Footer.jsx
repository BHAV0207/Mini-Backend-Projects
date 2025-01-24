import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2025 My To-Do List. All Rights Reserved.</p>
        <p className="mt-2">
          Follow us on{" "}
          <a
            href="#"
            className="text-blue-400 hover:text-blue-300 transition duration-300"
          >
            Twitter
          </a>{" "}
          |{" "}
          <a
            href="#"
            className="text-blue-400 hover:text-blue-300 transition duration-300"
          >
            Instagram
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
