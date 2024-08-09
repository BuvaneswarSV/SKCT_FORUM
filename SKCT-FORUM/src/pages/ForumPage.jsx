import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledForm = styled('form')({
  marginBottom: '2rem',
});

const StyledCard = styled(Card)({
  marginBottom: '1.5rem',
});

const StyledButton = styled(Button)({
  marginTop: '1rem',
});

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data);
      } catch (error) {
        setError('Error fetching posts. Please try again.');
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('content', postContent);
    if (file) formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPosts([...posts, response.data]);
      setPostContent('');
      setFile(null);
    } catch (error) {
      setError('Error posting content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Forum
      </Typography>

      <StyledForm onSubmit={handleSubmit}>
        <TextField
          label="Share your thoughts..."
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginTop: '1rem' }}
        />
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !postContent.trim()}
        >
          {loading ? <CircularProgress size={24} /> : 'Post'}
        </StyledButton>
      </StyledForm>

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3}>
        {posts.length === 0 ? (
          <Typography variant="body1">No posts yet. Be the first to post!</Typography>
        ) : (
          posts.map((post, index) => (
            <Grid item xs={12} key={index}>
              <StyledCard>
                <CardContent>
                  <Typography variant="body1">{post.content}</Typography>
                  {post.fileUrl && (
                    <Typography variant="body2">
                      <a href={`http://localhost:5000${post.fileUrl}`} target="_blank" rel="noopener noreferrer">
                        View Attachment
                      </a>
                    </Typography>
                  )}
                  <Typography variant="caption" color="textSecondary">
                    {new Date(post.timestamp).toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Like
                  </Button>
                  <Button size="small" color="primary">
                    Reply
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))
        )}
      </Grid>
    </StyledContainer>
  );
};

export default ForumPage;
