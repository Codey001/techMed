import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import docPic from "./doc.png"
import patPic from "./pat.png"

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.status);
  const userType = useSelector((state) => state.userData?.type);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userData);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLoginClick = () => {
    toggleProfileMenu()
    toggleMobileMenu()
    navigate("/login"); // Adjust the path as needed
  };

  const handleSignUpClick = () => {
    toggleProfileMenu()
    toggleMobileMenu()
    navigate("/signup"); // Adjust the path as needed
  };

  const handleProfileClick = () => {
    console.log(userProfile);
    toggleProfileMenu()
    toggleMobileMenu()
    navigate("/profile"); // Adjust the path as needed
  };

  const handleDashboardClick = () => {
    toggleProfileMenu()
    toggleMobileMenu()
    navigate("/dashboard"); // Adjust the path as needed
  }

  const handleLogoutClick = () => {
    toggleProfileMenu()
    toggleMobileMenu()

    //HANDLE LOGOUT
    logout();
    // Clear the Redux store after logout
    dispatch(logout());

    // Add your logout logic here, e.g., clearing tokens, etc.
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-blue-100 p-4 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Company Name */}
        <Link to="/">
          <div className="text-xl font-bold text-blue-600 cursor-pointer">
            techMed
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
                {userType === "Doctor" ? (
                  <div className="bg-blue-500 rounded-full text-white w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img src={docPic} alt="" />
                  </div>
                ) : (
                  <div className="bg-blue-500 rounded-full text-white w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img src={patPic} alt="" />
                  </div>
                )}
              </div>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                <a
                    onClick={handleDashboardClick}
                    className="block px-4 py-2 text-blue-600 hover:bg-blue-100 cursor-pointer"
                  >
                    Dashboard
                  </a>
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
          <div onClick={toggleProfileMenu} className="cursor-pointer">
                {userType === "Doctor" ? (
                  <div className="bg-blue-500 rounded-full text-white w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img src={docPic} alt="" />
                  </div>
                ) : (
                  <div className="bg-blue-500 rounded-full text-white w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img src={patPic} alt="" />
                  </div>
                )}
              </div>
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
            <div className="mt-2 space-y-2 z-10">
                <a
                    onClick={handleDashboardClick}
                    className="block bg-white text-blue-500 border-2 border-blue-500 px-4 py-2 rounded-lg cursor-pointer text-center"
                  >
                    Dashboard
                  </a>
                  <a
                    onClick={handleProfileClick}
                    className="block text-center bg-white text-blue-500 border-2 border-blue-500 px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Profile
                  </a>
                  <a
                    onClick={handleLogoutClick}
                    className="block text-center bg-white text-blue-500 border-2 border-blue-500 px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Logout
                  </a>
                </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
