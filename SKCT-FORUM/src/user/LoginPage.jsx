import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Login.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};
    if (!formData.email) {
      validationErrors.email = 'Fill the email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      validationErrors.password = 'Fill the password';
    }

    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
      // const { accessToken, role } = response.data;
      // localStorage.setItem("token", accessToken);
      // localStorage.setItem("role", role);
      // console.log("token:",localStorage.getItem("token"));
      // alert("Login Success!");
      // if (role === "ADMIN") {
      //   navigate("/admin");
      // } else {
        navigate("/dashboard");
      // }
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
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
          <h1 style={{ color: 'black', marginBottom: '1.5rem', fontSize: '2rem' }}>Login</h1>
          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
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
                value={formData.password}
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
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
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
              Login
            </button>
          </form>
          <p style={{ marginTop: '1rem', color: 'black' }}>Don't have an account? <a href="/register" style={{ textDecoration: 'none', color: '#007bff' }}>Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
