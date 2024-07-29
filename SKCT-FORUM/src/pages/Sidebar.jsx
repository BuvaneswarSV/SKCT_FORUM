import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Forum, Person } from '@mui/icons-material';

const Sidebar = () => {
  const sidebarStyle = {
    width: '200px',
    backgroundColor: '#f4f4f4',
    padding: '1rem',
  };

  const ulStyle = {
    listStyle: 'none',
    padding: 0,
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 0',
  };

  const iconStyle = {
    marginRight: '0.5rem',
  };

  return (
    <div style={sidebarStyle}>
      <ul style={ulStyle}>
        <li>
          <Link to="/dashboard" style={linkStyle}>
            <Home style={iconStyle} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/posts" style={linkStyle}>
            <Forum style={iconStyle} />
            Posts
          </Link>
        </li>
        {/* <li>
          <Link to="/profile" style={linkStyle}>
            <Person style={iconStyle} />
            Profile
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
