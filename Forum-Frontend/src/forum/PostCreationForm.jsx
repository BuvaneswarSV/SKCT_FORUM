import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './PostCreationForm.css';

const PostCreationForm = ({ onCreate }) => {
  const [content, setContent] = useState('');
  const { currentUser } = useAuth(); // Use currentUser instead of user

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) { // Use currentUser for the check
      console.error('User is not authenticated');
      return;
    }
    if (content) {
      const post = {
        id: Date.now(), // Generate unique ID for the post
        content,
        author: currentUser.email, // Use currentUser.email
        role: currentUser.role, // Use currentUser.role
        date: new Date().toLocaleDateString(),
        upvotes: 0, // Initialize with 0 upvotes
      };
      console.log('Post Created:', post); // Debugging log
      onCreate(post); // Pass the new post object
      setContent(''); // Reset the content field after submission
    }
  };

  return (
    <form className="post-creation-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="content">Post Content</label>
        <textarea
          className="form-control"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Create Post</button>
    </form>
  );
};

export default PostCreationForm;
