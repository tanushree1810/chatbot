import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // For theme toggle icons
import logo from '../assets/logo.png'
const Navbar = ({ toggleTheme, darkMode }) => {
  return (
    <div className="w-full p-4 flex justify-between items-center border-b">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Cybersecurity Bot" className="w-10 h-10" />
        <h1 className="text-xl font-bold">PhishGaurd Bot</h1>
      </div>
      <button onClick={toggleTheme} className="p-2 rounded-full">
        {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-blue-500" />}
      </button>
    </div>
  );
};

export default Navbar;
