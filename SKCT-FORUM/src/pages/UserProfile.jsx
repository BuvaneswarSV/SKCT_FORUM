import React, { useState } from 'react';

const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    joined: 'January 15, 2023',
    bio: 'Web developer and technology enthusiast.'
  });

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save the updated profile information
    setEditing(false);
  };

  const profileStyle = {
    padding: '2rem',
    backgroundColor: '#ecf0f1',
    minHeight: '100vh',
  };

  const headerStyle = {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '2rem',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const profileHeaderStyle = {
    fontSize: '1.5rem',
    color: '#3498db',
    marginBottom: '1rem',
  };

  const profileContentStyle = {
    fontSize: '1rem',
    color: '#7f8c8d',
    marginBottom: '1rem',
  };

  const profileInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  const profileInfoItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #ecf0f1',
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: '#2c3e50',
  };

  const valueStyle = {
    color: '#34495e',
  };

  const inputStyle = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #bdc3c7',
    width: '100%',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#1abc9c',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '1rem',
  };

  const editButtonStyle = {
    backgroundColor: '#3498db',
  };

  return (
    <div style={profileStyle}>
      <h2 style={headerStyle}>User Profile</h2>
      <div style={cardStyle}>
        <div style={profileHeaderStyle}>Profile Information</div>
        <div style={profileContentStyle}>
          Manage your personal information and account settings.
        </div>
        <div style={profileInfoStyle}>
          {Object.keys(profile).map((key) => (
            <div key={key} style={profileInfoItemStyle}>
              <span style={labelStyle}>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
              {editing && key !== 'joined' ? (
                <input
                  type="text"
                  name={key}
                  value={profile[key]}
                  onChange={handleChange}
                  style={inputStyle}
                />
              ) : (
                <span style={valueStyle}>{profile[key]}</span>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={editing ? handleSave : handleEditToggle}
          style={{ ...buttonStyle, ...(editing ? {} : editButtonStyle) }}
        >
          {editing ? 'Save' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
