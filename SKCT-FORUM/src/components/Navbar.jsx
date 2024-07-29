// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Info, Work, AccountCircle, AdminPanelSettings, Dashboard, Group, Forum, BarChart, ExitToApp } from '@mui/icons-material';
import './Navbar.css';
import logo from './clg.webp';

const Navbar = ({ isLoggedIn, handleLogout, username }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <a href="#" className="logo">
          <img src={logo} alt="SKCT Logo" className="logo-image" />
          <div className="logo-text">
            <span>Sri Krishna College of Technology</span><br />
            <small>An Autonomous Institution | Accredited by NAAC with 'A' Grade</small>
          </div>
        </a>
        <ul className="navbar-links">
          {!isLoggedIn ? (
            <>
              <li className="navbar-item">
                <Link to="/">
                  <Home />
                  <span>Home</span>
                </Link>
              </li>
              <li className="navbar-item">
                <a href="#">
                  <Info />
                  <span>About Us</span>
                </a>
              </li>
              <li className="navbar-item">
                <a href="#">
                  <Work />
                  <span>Work</span>
                </a>
              </li>
              <li className="navbar-item">
                <a href="#">
                  <AccountCircle />
                  <span>Info</span>
                </a>
              </li>
              <li className="navbar-item">
                <Link to="/admin">
                  <AdminPanelSettings />
                  <span>Login</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/admin/dashboard">
                  <Dashboard />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/admin/users">
                  <Group />
                  <span>Users</span>
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/admin/posts">
                  <Forum />
                  <span>Posts</span>
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/admin/statistics">
                  <BarChart />
                  <span>Statistics</span>
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/" onClick={handleLogout}>
                  <ExitToApp />
                  <span>Logout</span>
                </Link>
              </li>
              <li className="navbar-item">
                <AccountCircle />
                <span>{username}</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
