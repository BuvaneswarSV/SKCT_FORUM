import React, { useState } from 'react';
import { Button, Card, CardContent, CardActions, Typography, List, ListItem, IconButton, Snackbar, Alert, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Mock data for posts
const initialPosts = [
  { id: 1, title: 'Post 1', content: 'Where is the Library?.' },
  { id: 2, title: 'Post 2', content: 'What is the highest package.' },
  { id: 3, title: 'Post 3', content: 'Malarvizhi Mam visited SKCT!!!.' },
  { id: 4, title: 'Post 4', content: 'SKCT won 1st prize in Smart India Hackathon.' },
  { id: 5, title: 'Post 5', content: 'Updates in playGround!.' },
  { id: 6, title: 'Post 6', content: 'Updates in playGround!.' },
  { id: 7, title: 'Post 7', content: 'Updates in playGround!.' },
];

const Posts = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deletedPost, setDeletedPost] = useState(null);

  const handleDelete = (id) => {
    const postToDelete = posts.find(post => post.id === id);
    setDeletedPost(postToDelete);

    // Filter out the post with the given id
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    setOpenSnackbar(true); // Open the Snackbar
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <List>
        {posts.map(post => (
          <ListItem key={post.id} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Card sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <CardContent>
                  <Typography variant="h5">{post.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.content}
                  </Typography>
                </CardContent>
              </Box>
              <CardActions>
                <IconButton color="error" onClick={() => handleDelete(post.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </ListItem>
        ))}
      </List>

      {/* Snackbar for deletion notification */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity="success" >
          {deletedPost ? `${deletedPost.title} has been deleted!` : 'Post has been deleted!'}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Posts;
