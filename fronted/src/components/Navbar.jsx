import React from 'react';
import { Link } from 'react-router-dom';
import { MdHome } from 'react-icons/md';

export default function Navbar() {
  return (
    <nav className="bg-[rgb(255,225,246)] bg-gradient-to-r from-[rgb(255,231,247)] via-[rgb(255,235,249)] to-[hsl(320,100%,96%)] text-black shadow-lg px-6 py-4 sticky top-0 z-50 backdrop-blur-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
      
        <div className="flex items-center space-x-3 text-2xl font-extrabold font-serif">
          <img
            src="https://icons.iconarchive.com/icons/iconarchive/mothers-day/256/Perfume-Bottle-icon.png"
            alt="Perfume Icon"
            className="w-8 h-8 object-contain"
          />
          <span className="transform transition hover:scale-105 duration-300 text-[#21041c]">
            Perfume Shop
          </span>
        </div>

      
        <div className="w-full md:flex md:items-center md:w-auto hidden">
          <div className="flex space-x-8 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-[#1c0219] hover:text-[#391d37] transition transform hover:scale-105 duration-300"
            >
              <MdHome className="text-2xl text-[#2a0225]" />
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
