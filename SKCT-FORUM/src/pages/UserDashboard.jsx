import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the path as needed
import './UserDashboard.css';

const UserDashboard = () => {
  const dashboardStyle = {
    padding: '2rem',
    backgroundColor: '#ecf0f1',
    minHeight: '100vh',
  };

  const headerStyle = {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '2rem',
  };

  const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '2rem',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    flex: '1 1 300px',
    textAlign: 'center',
  };

  const cardHeaderStyle = {
    fontSize: '1.5rem',
    color: '#1abc9c',
    marginBottom: '1rem',
  };

  const cardContentStyle = {
    fontSize: '1rem',
    color: '#7f8c8d',
  };

  const statsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '2rem',
  };

  const statBoxStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '1rem 2rem',
    textAlign: 'center',
  };

  const statHeaderStyle = {
    fontSize: '1.2rem',
    color: '#3498db',
    marginBottom: '0.5rem',
  };

  const statNumberStyle = {
    fontSize: '2rem',
    color: '#2c3e50',
  };

  return (
    <div style={dashboardStyle}>
      <h2 style={headerStyle}>Welcome to the User Dashboard</h2>
      <div style={statsContainerStyle}>
        <div style={statBoxStyle}>
          <div style={statHeaderStyle}>Total Posts</div>
          <div style={statNumberStyle}>24</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statHeaderStyle}>Followers</div>
          <div style={statNumberStyle}>150</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statHeaderStyle}>Messages</div>
          <div style={statNumberStyle}>8</div>
        </div>
      </div>
      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>Recent Activities</div>
          <div style={cardContentStyle}>
            <ul>
              <li>Commented on a post</li>
              <li>Liked a post</li>
              <li>Started following John Doe</li>
              <li>Updated profile picture</li>
            </ul>
          </div>
        </div>
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>Notifications</div>
          <div style={cardContentStyle}>
            <ul>
              <li>You have a new message</li>
              <li>Your post was liked by Jane</li>
              <li>Update your profile information</li>
              <li>New friend request from Alice</li>
            </ul>
          </div>
        </div>
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>Upcoming Events</div>
          <div style={cardContentStyle}>
            <ul>
              <li>Web Development Workshop - July 30</li>
              <li>College Fest - August 15</li>
              <li>Alumni Meetup - September 10</li>
              <li>Hackathon - October 5</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
