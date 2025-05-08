import React, { useState, useEffect } from 'react';
import Logo from '../assets/Logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem('profilePicture'));

  const isLoggedIn = !!token;
  const profilePicUrl =
    profilePicture && profilePicture !== 'undefined' && profilePicture !== 'null' && profilePicture.trim() !== ''
      ? `http://localhost:5001/uploads/${profilePicture}`
      : '/default-profile.png'; // Make sure this exists in public folder

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Sync auth state on login/logout (custom event + cross-tab support)
  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem('token'));
      setUsername(localStorage.getItem('username'));
      setProfilePicture(localStorage.getItem('profilePicture'));
    };

    window.addEventListener('authChange', syncAuth);
    window.addEventListener('storage', syncAuth);

    return () => {
      window.removeEventListener('authChange', syncAuth);
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  // Lock scroll on mobile menu open
  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow || 'auto';
    }

    return () => {
      document.body.style.overflow = originalOverflow || 'auto';
    };
  }, [isMenuOpen]);
  
  

  return (
    <header className="bg-white text-black px-4 py-3 fixed w-full shadow-md z-50 top-0 left-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="w-32 md:w-52 flex items-center">
          <a href="/">
            <img src={Logo} alt="MediSync Logo" className="w-full h-auto" />
          </a>
          <div className="font-poppins bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text font-bold text-lg md:text-3xl ml-3">MediSync</div>
        </div>
        {/* Navigation */}
        <nav className={`font-poppins font-semibold fixed top-0 left-0 h-full w-64 bg-black text-white transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:h-auto md:w-auto md:bg-transparent md:text-black md:flex md:translate-x-0`}>
          <ul className="flex flex-col space-y-6 p-8 md:flex-row md:space-y-0 md:space-x-6 md:p-0">
            <li><a href="/" className="hover:text-blue-400 text-lg" onClick={closeMenu}>Home</a></li>
            <li><a href="/records" className="hover:text-blue-400 text-lg" onClick={closeMenu}>Health Records</a></li>
            <li><a href="/appointments" className="hover:text-blue-400 text-lg" onClick={closeMenu}>Appointments</a></li>
            <li><a href="/tracker" className="hover:text-blue-400 text-lg" onClick={closeMenu}>Medication Tracker</a></li>
            <li><a href="/about" className="hover:text-blue-400 text-lg" onClick={closeMenu}>About</a></li>
            <li>
  <a href="/profile" onClick={closeMenu} className="flex items-center gap-2 hover:text-blue-400 text-lg">
    {isLoggedIn ? (
      profilePicUrl ? (
        <img
          src={profilePicUrl}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <span className="font-semibold">{username}</span>
      )
    ) : (
      "Profile"
    )}
  </a>
</li>

          </ul>
        </nav>
        {/* Menu Toggle Button */}
        <button className="text-2xl md:hidden focus:outline-none z-50" onClick={toggleMenu}>
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>
      {/* Pushes content down to prevent overlap */}
    </header>
  );
};

export default Header;