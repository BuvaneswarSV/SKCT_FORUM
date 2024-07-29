import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';

// Sample data
const userData = [
  { month: 'Jan', users: 200 },
  { month: 'Feb', users: 300 },
  { month: 'Mar', users: 250 },
  { month: 'Apr', users: 400 },
  { month: 'May', users: 350 },
  { month: 'Jun', users: 500 },
  { month: 'Jul', users: 600 },
];

const postData = [
  { month: 'Jan', posts: 50 },
  { month: 'Feb', posts: 80 },
  { month: 'Mar', posts: 65 },
  { month: 'Apr', posts: 120 },
  { month: 'May', posts: 90 },
  { month: 'Jun', posts: 150 },
  { month: 'Jul', posts: 100 },
];

const activityData = [
  { name: 'Posts', value: 400 },
  { name: 'Comments', value: 300 },
  { name: 'Likes', value: 200 },
  { name: 'Shares', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Statistics = () => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h4" gutterBottom>
        College Forum Statistics
      </Typography>
      <Grid container spacing={3}>
        {/* <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly New Users
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={userData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid> */}

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly New Posts
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={postData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="posts" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              User Activity Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={activityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
