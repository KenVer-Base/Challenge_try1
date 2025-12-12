import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button'; // Import Button

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-black tracking-widest">
          METARFLOW
        </Link>

        {/* Menu Tengah */}
        <div className="hidden md:flex space-x-8 font-semibold text-slate-600">
          {['Home', 'Property', 'About Us', 'Contact'].map((item) => (
            <Link key={item} to="/" className="hover:text-orange-500 transition-colors">
              {item}
            </Link>
          ))}
        </div>

        {/* Tombol Auth */}
        <div className="flex gap-3">
          {isLoggedIn ? (
            <Button 
              onClick={() => setIsLoggedIn(false)} 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-50" // Custom style khusus logout merah
            >
              Logout
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              {/* Tombol Login: Outline Orange */}
              <Button to="/login" variant="outline">
                Login
              </Button>
              
              {/* Tombol Register: Solid Orange */}
              <Button to="/register" variant="primary">
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;