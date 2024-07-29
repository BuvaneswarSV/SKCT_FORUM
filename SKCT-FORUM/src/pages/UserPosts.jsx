import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const UserPosts = () => {
  const initialPosts = [
    {
      id: 1,
      title: 'Post Title 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna nec massa pretium gravida.',
      date: 'July 25, 2024',
    },
    {
      id: 2,
      title: 'Post Title 2',
      content: 'Fusce efficitur, odio ac facilisis varius, sapien augue vehicula nulla, non feugiat felis nisi vel turpis.',
      date: 'July 22, 2024',
    },
    {
      id: 3,
      title: 'Post Title 3',
      content: 'Integer commodo velit ut orci efficitur, a facilisis nisi sodales. Nam eu nulla sit amet nulla ullamcorper feugiat.',
      date: 'July 20, 2024',
    },
    {
      id: 4,
      title: 'Post Title 4',
      content: 'Curabitur sit amet dui ut ligula venenatis scelerisque. In ac urna quis lorem malesuada volutpat.',
      date: 'July 18, 2024',
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [deletedPost, setDeletedPost] = useState(null);

  const handleEdit = (id, content) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleDelete = (id) => {
    const postToDelete = posts.find(post => post.id === id);
    setPosts(posts.filter(post => post.id !== id));
    setDeletedPost(postToDelete);
    setShowPopup(true);
  };

  const handleSave = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, content: editContent } : post));
    setEditingId(null);
    setEditContent('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleCloseSnackbar = () => {
    setShowPopup(false);
    setDeletedPost(null);
  };

  const postsStyle = {
    padding: '2rem',
    backgroundColor: '#ecf0f1',
    minHeight: '100vh',
  };

  const headerStyle = {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '2rem',
  };

  const postContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  };

  const postCardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    position: 'relative',
  };

  const postHeaderStyle = {
    fontSize: '1.2rem',
    color: '#3498db',
    marginBottom: '0.5rem',
  };

  const postContentStyle = {
    fontSize: '1rem',
    color: '#7f8c8d',
  };

  const postFooterStyle = {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#95a5a6',
  };

  const iconStyle = {
    cursor: 'pointer',
    margin: '0 0.5rem',
  };

  return (
    <div style={postsStyle}>
      <Snackbar
        open={showPopup}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {deletedPost ? `${deletedPost.title} has been deleted!` : 'Post has been deleted!'}
        </Alert>
      </Snackbar>
      <h2 style={headerStyle}>User Posts</h2>
      <div style={postContainerStyle}>
        {posts.map((post) => (
          <div key={post.id} style={postCardStyle}>
            <div style={postHeaderStyle}>{post.title}</div>
            {editingId === post.id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows="4"
                  style={{ width: '100%', padding: '0.5rem' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <FontAwesomeIcon
                    icon={faSave}
                    onClick={() => handleSave(post.id)}
                    style={{ ...iconStyle, color: '#1abc9c' }}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={handleCancel}
                    style={{ ...iconStyle, color: '#e74c3c' }}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={postContentStyle}>{post.content}</div>
                <div style={postFooterStyle}>Posted on {post.date}</div>
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEdit(post.id, post.content)}
                    style={{ ...iconStyle, color: '#3498db' }}
                  />
                  {/* <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(post.id)}
                    style={{ ...iconStyle, color: '#e74c3c' }}
                  /> */}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
