import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const Users = () => {
  // Dummy user data
  const users = [
    { id: "727822TUCS012", name: 'ANGEETHA K', email: '727822tucs012@skct.edu.in' },
    { id: "727822TUCS015", name: 'ANVEETHRAAJ K S', email: '727822tucs015@skct.edu.in' },
    { id: "727822TUCS019", name: 'BALAHARINI M', email: '727822tucs019@skct.edu.in' },
    { id: "727822TUCS025", name: 'BRINDHA M', email: '727822tucs025@skct.edu.in' },
    { id: "727822TUCS026", name: 'BUVANESWAR S V', email: '727822tucs026@skct.edu.in' },
    { id: "727822TUCS027", name: 'CHANDRU M', email: '727822tucs027@skct.edu.in' },
    // { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Register NO</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Users;
