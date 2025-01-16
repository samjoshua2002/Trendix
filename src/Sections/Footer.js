import React from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { PiFacebookLogoBold } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-100 via-gray-200  to-gray-300 py-20">
      <div className="container mx-auto px-6">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center text-gray-800 space-x-6 gap-y-3 font-medium text-lg">
          <a href="#about" className="hover:text-gray-600 transition">About</a>
          <a href="#blog" className="hover:text-gray-600 transition">Blog</a>
          <a href="#license" className="hover:text-gray-600 transition">License</a>
          <a href="#partners" className="hover:text-gray-600 transition">Partners</a>
          <a href="#terms" className="hover:text-gray-600 transition">Terms of Service</a>
          <a href="#privacy" className="hover:text-gray-600 transition">Privacy Policy</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 text-gray-700 text-3xl py-8">
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
            <FaWhatsapp />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
            <PiFacebookLogoBold />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaXTwitter />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-center text-sm">
          © 2024 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
