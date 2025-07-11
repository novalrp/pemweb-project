import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white shadow-md">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-9 invert opacity-80" />
      </Link>

      {/* Navigasi kanan */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-700 font-medium">
              {user.username}
            </span>
            <button
              onClick={() => navigate('/owner')}
              className="text-sm px-4 py-1 border border-gray-500 rounded hover:bg-gray-100"
            >
              Dasbor
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Keluar
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Masuk
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
