import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Login.css';

const RegisterUser = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    roles: 'USER',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errors = {};
    if (!userData.email) {
      errors.email = 'Fill the email';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!userData.password) {
      errors.password = 'Fill the password';
    } else if (userData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (!userData.confirmPassword) {
      errors.confirmPassword = 'Fill the password';
    } else if (userData.confirmPassword !== userData.password) {
      errors.confirmPassword = 'Passwords must match';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({}); // Clear previous errors
    setServerError(''); // Clear previous server error

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', userData);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error(error);
      setServerError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='bckimg' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{
          maxWidth: '400px',
          width: '100%',
          padding: '2rem',
          border: '1px solid #ccc',
          borderRadius: '10px',
          textAlign: 'center',
          backgroundColor: '#add8e6',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <h1 style={{ color: 'black', marginBottom: '1.5rem', fontSize: '2rem' }}>Register</h1>
          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  fontSize: '1rem'
                }}
              />
              {errors.email && <div style={{ color: 'red', marginTop: '0.25rem' }}>{errors.email}</div>}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  fontSize: '1rem'
                }}
              />
              {errors.password && <div style={{ color: 'red', marginTop: '0.25rem' }}>{errors.password}</div>}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  fontSize: '1rem'
                }}
              />
              {errors.confirmPassword && <div style={{ color: 'red', marginTop: '0.25rem' }}>{errors.confirmPassword}</div>}
            </div>
            <button type="submit" style={{
              width: '100%',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#007bff',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
              marginBottom: '1rem'
            }}>
              Register
            </button>
            {serverError && <div style={{ color: 'red', marginTop: '0.25rem' }}>{serverError}</div>}
          </form>
          <p style={{ marginTop: '1rem', color: 'black' }}>Already have an account? <a href="/login" style={{ textDecoration: 'none', color: '#007bff' }}>Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
