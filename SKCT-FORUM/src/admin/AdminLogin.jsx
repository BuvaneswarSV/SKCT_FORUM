// src/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './AdminLogin.css';
const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { handleLogin } = useOutletContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your admin authentication logic
    if (username === 'Buvi' && password === '123') {
      handleLogin(username); // Pass the username to handleLogin
      navigate('/admin/dashboard'); // Adjust the path if you have a dashboard route
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div id="login-box">
      <h2 id="loginTitle">Admin Login</h2>
      {error && <p id="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div id="user-box">
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <label>Username</label>
        </div>
        <div id="user-box">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <label>Password</label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
