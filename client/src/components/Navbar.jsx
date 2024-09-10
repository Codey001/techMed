// import * as React from 'react';
// import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Avatar, Button, Tooltip, MenuItem, Container } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// const pages = ['Home', 'Appointments'];
// const settings = ['Profile', 'Logout'];

// function Navbar() {
//     const [anchorElNav, setAnchorElNav] = React.useState(null);
//     const [anchorElUser, setAnchorElUser] = React.useState(null);

//     const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
//     const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
//     const handleCloseNavMenu = () => setAnchorElNav(null);
//     const handleCloseUserMenu = () => setAnchorElUser(null);

//     return (
//         <AppBar position="static" sx={{ backgroundColor: '#4b4b9c' }}>
//             <Container maxWidth="xl">
//                 <Toolbar disableGutters>
//                     {/* Custom Logo */}
//                     <div className="logo">
//                         <img src="logo.png" alt="TechMed Logo" className="logo-img" />
//                         <span className="logo-text">TechMed</span>
//                     </div>

//                     {/* Mobile Menu Icon */}
//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                         <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
//                             <MenuIcon />
//                         </IconButton>
//                         <Menu
//                             anchorEl={anchorElNav}
//                             open={Boolean(anchorElNav)}
//                             onClose={handleCloseNavMenu}
//                             anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//                             transformOrigin={{ vertical: 'top', horizontal: 'left' }}
//                             sx={{ display: { xs: 'block', md: 'none' } }}
//                         >
//                             {pages.map((page) => (
//                                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                                     <Typography textAlign="center" sx={{ color: '#4b4b9c' }}>{page}</Typography>
//                                 </MenuItem>
//                             ))}
//                         </Menu>
//                     </Box>

//                     {/* Desktop Navigation Buttons aligned to the right */}
//                     <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
//                         {pages.map((page) => (
//                             <Button key={page} onClick={handleCloseNavMenu} sx={{ color: 'white', fontWeight: 'bold' }}>
//                                 {page}
//                             </Button>
//                         ))}
//                     </Box>

//                     {/* User Menu */}
//                     <Box sx={{ flexGrow: 0 }}>
//                         <Tooltip title="See Pages">
//                             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                                 <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
//                             </IconButton>
//                         </Tooltip>
//                         <Menu
//                             anchorEl={anchorElUser}
//                             open={Boolean(anchorElUser)}
//                             onClose={handleCloseUserMenu}
//                             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//                             sx={{ mt: '45px' }}
//                         >
//                             {settings.map((setting) => (
//                                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                                     <Typography textAlign="center" sx={{ color: '#4b4b9c' }}>{setting}</Typography>
//                                 </MenuItem>
//                             ))}
//                         </Menu>
//                     </Box>
//                 </Toolbar>
//             </Container>
//         </AppBar>
//     );
// }
// export default Navbar;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { logout } from "../store/authSlice.js";
import { useDispatch } from "react-redux";


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

    // navigate('/profile'); // Adjust the path as needed
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
        <div className="text-xl font-bold text-blue-600">MyHealthApp</div>

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
