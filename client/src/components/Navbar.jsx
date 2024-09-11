import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { logout } from "../store/authSlice.js";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.status);
  const userType = useSelector((state) => state.userData?.type);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userData)


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/login'); // Adjust the path as needed
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Adjust the path as needed
  };

  const handleProfileClick = () => {


    console.log(userProfile)


    navigate('/profile'); // Adjust the path as needed
  };

  const handleLogoutClick = () => {

    //HANDLE LOGOUT
    logout();
    // Clear the Redux store after logout
    dispatch(logout());

    // Add your logout logic here, e.g., clearing tokens, etc.
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-blue-100 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Company Name */}
        <Link to="/">
    <div className="text-xl font-bold text-blue-600 cursor-pointer">
      MyHealthApp
    </div>
  </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center relative">
          {!isLoggedIn ? (
            <>
              <button
                onClick={handleLoginClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Login
              </button>
              <button
                onClick={handleSignUpClick}
                className="bg-white text-blue-500 border-2 border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative">
              <div onClick={toggleProfileMenu} className="cursor-pointer">
                {userType === 'Doctor' ? (
                  <div className="bg-blue-500 rounded-full text-white w-10 h-10 flex items-center justify-center">
                    D
                  </div>
                ) : (
                  <div className="bg-blue-500 rounded-full text-white w-10 h-10 flex items-center justify-center">
                    P
                  </div>
                )}
              </div>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <a
                    onClick={handleProfileClick}
                    className="block px-4 py-2 text-blue-600 hover:bg-blue-100 cursor-pointer"
                  >
                    Profile
                  </a>
                  <a
                    onClick={handleLogoutClick}
                    className="block px-4 py-2 text-blue-600 hover:bg-blue-100 cursor-pointer"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-blue-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 space-y-2">
          {!isLoggedIn ? (
            <>
              <button
                onClick={handleLoginClick}
                className="block w-full text-left bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Login
              </button>
              <button
                onClick={handleSignUpClick}
                className="block w-full text-left bg-white text-blue-500 border-2 border-blue-500 px-4 py-2 rounded-lg"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative">
              <div onClick={toggleProfileMenu} className="cursor-pointer">
                {userType === 'Doctor' ? (
                  <div className="bg-blue-500 rounded-full text-white w-10 h-10 flex items-center justify-center">
                    D
                  </div>
                ) : (
                  <div className="bg-blue-500 rounded-full text-white w-10 h-10 flex items-center justify-center">
                    P
                  </div>
                )}
              </div>

              {/* Mobile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="mt-2 space-y-2">
                  <a
                    onClick={handleProfileClick}
                    className="block text-left bg-white text-blue-500 border-2 border-blue-500 px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Profile
                  </a>
                  <a
                    onClick={handleLogoutClick}
                    className="block text-left bg-white text-blue-500 border-2 border-blue-500 px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
