import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './home/Home';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import Users from './admin/Users';
import Posts from './admin/Posts';
import Statistics from './admin/Statistics';
import LoginPage from './user/LoginPage';
import RegisterPage from './user/RegisterPage';
import Sidebar from './pages/Sidebar';
import UserDashboard from './pages/UserDashboard';
import UserPosts from './pages/UserPosts';
import UserProfile from './pages/UserProfile';

const App = () => {
  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  const mainContainerStyle = {
    display: 'flex',
    flex: 1,
  };

  const contentStyle = {
    flex: 1,
    padding: '1rem',
  };

  return (
    <Router>
      <div style={appStyle}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="admin" element={<AdminLogin />} />
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/posts" element={<Posts />} />
            <Route path="admin/statistics" element={<Statistics />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="*"
            element={
              <div style={mainContainerStyle}>
                <Sidebar />
                <div style={contentStyle}>
                  <Routes>
                    
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/posts" element={<UserPosts />} />
                    <Route path="/profile" element={<UserProfile />} />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
