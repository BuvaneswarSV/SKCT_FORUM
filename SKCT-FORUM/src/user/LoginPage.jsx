import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Login.css';

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Fill the email'),
      password: Yup.string().required('Fill the password')
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem('loggedIn', true);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    }
  });

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
          <form onSubmit={formik.handleSubmit} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Email Address</label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  fontSize: '1rem'
                }}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red', marginTop: '0.25rem' }}>{formik.errors.email}</div>
              ) : null}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Password</label>
              <input
                id="password"
                type="password"
                {...formik.getFieldProps('password')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  fontSize: '1rem'
                }}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red', marginTop: '0.25rem' }}>{formik.errors.password}</div>
              ) : null}
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
