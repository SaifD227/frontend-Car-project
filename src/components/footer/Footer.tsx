import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 text-gray-700 text-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Left Side: Copyright */}
        <p className="text-center md:text-left">
          Copyright © saifAdviser 2025. All Rights Reserved. Developed by{" "}
          <a href="https://kynox.com" className="text-blue-500 hover:underline">
            Kynox
          </a>
        </p>

        {/* Right Side: Contact Info */}
        <div className="flex items-center space-x-6 mt-2 md:mt-0">
          <div className="flex items-center space-x-2">
            <FaPhone className="text-gray-600" />
            <span>058-4007968</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-gray-600" />
            <span>contact@caradviser.io</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
