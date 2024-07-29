import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import './Dashboard.css';

const Dashboard = () => {
  const [recentPosts, setRecentPosts] = useState([
    { id: 1, title: 'Welcome to the Forum', author: 'Admin' },
    { id: 2, title: 'Exam Schedules Released', author: 'Amit Kumar' },
    { id: 3, title: 'Holiday Announcement', author: 'Priya Sharma' },
    { id: 4, title: 'Workshop on AI', author: 'Ravi Patel' },
    { id: 5, title: 'New Library Books', author: 'Anjali Gupta' },
  ]);

  const [recentUsers, setRecentUsers] = useState([
    { id: 1, name: 'Rohit Verma', email: 'rohit.verma@example.com' },
    { id: 2, name: 'Sita Devi', email: 'sita.devi@example.com' },
    { id: 3, name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com' },
    { id: 4, name: 'Meena Rao', email: 'meena.rao@example.com' },
    { id: 5, name: 'Arjun Singh', email: 'arjun.singh@example.com' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecentPosts(prevPosts => {
        const newPost = { id: Date.now(), title: 'New Dynamic Post', author: 'Generated Author' };
        return [newPost, ...prevPosts.slice(0, 4)];
      });

      setRecentUsers(prevUsers => {
        const newUser = { id: Date.now(), name: 'New User', email: 'new.user@example.com' };
        return [newUser, ...prevUsers.slice(0, 4)];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg" className="dashboard-container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className="dashboard-paper">
            <Typography variant="h5" className="black-text">Forum Activity Summary</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" className="black-text">Total Posts: 124</Typography>
              <Typography variant="body1" className="black-text">Total Users: 54</Typography>
              <Typography variant="body1" className="black-text">Active Users Today: 12</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="dashboard-paper">
            <Typography variant="h6" className="black-text">Recent Posts</Typography>
            {recentPosts.map((post) => (
              <Box key={post.id} className="dashboard-item recent-post">
                <Typography variant="subtitle1" className="black-text">{post.title}</Typography>
                <Typography variant="body2" className="black-text">by {post.author}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="dashboard-paper">
            <Typography variant="h6" className="black-text">Recent User Registrations</Typography>
            {recentUsers.map((user) => (
              <Box key={user.id} className="dashboard-item recent-user">
                <Typography variant="subtitle1" className="black-text">{user.name}</Typography>
                <Typography variant="body2" className="black-text">{user.email}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
