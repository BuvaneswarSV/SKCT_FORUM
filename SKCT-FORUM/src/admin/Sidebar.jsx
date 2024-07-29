import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material';
import { Home, Group, Forum, BarChart, Menu as MenuIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleSidebarToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton
        onClick={handleSidebarToggle}
        sx={{
          position: 'fixed',
          top: '110px',
          left: '10px',
          width: 50,
          zIndex: 1,
          backgroundColor: '#ffffff',
          borderRadius: '20%',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleSidebarToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#f5f5f5',
            padding: '10px',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
          <IconButton onClick={handleSidebarToggle}>
            <MenuIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem button component={NavLink} to="/admin/dashboard" activeClassName="Mui-selected" exact>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={NavLink} to="/admin/users" activeClassName="Mui-selected">
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={NavLink} to="/admin/posts" activeClassName="Mui-selected">
            <ListItemIcon>
              <Forum />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItem>
          <ListItem button component={NavLink} to="/admin/statistics" activeClassName="Mui-selected">
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
