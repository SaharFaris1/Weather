import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';


interface User {
  fullName?: string;
  [key: string]: any; 
}

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser: User = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(parsedUser.fullName || '');
    }

    const handleStorageChange = () => {
      const currentUser = localStorage.getItem('user');
      if (currentUser) {
        const parsedUser: User = JSON.parse(currentUser);
        setIsLoggedIn(true);
        setUserName(parsedUser.fullName || '');
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  return (
    <nav className="bg-blue-500 shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="text-xl text-white flex items-center gap-2">
            <img src="https://cdn.freebiesupply.com/logos/large/2x/weather-ios-logo-svg-vector.svg" alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="text-white">OpenWeather</span>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4 space-x-reverse items-center">
            {isLoggedIn && (
              <>
                <span className="text-white"> {userName}</span>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden text-white flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
              aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-3 border-t border-gray-200">
            {isLoggedIn ? (
              <div className="flex flex-col space-y-3 px-4">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-center"
                >
               Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-4">
              
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;