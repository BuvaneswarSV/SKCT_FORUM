import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCreationForm from './PostCreationForm';
import { useAuth } from '../context/AuthContext';
import './Thread.css';

const Thread = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  const { currentUser } = useAuth();
  useEffect(() => {
    // Fetch thread from the backend
    const threads = [
      { 
        id: parseInt(id), 
        title: `${currentUser.name}, post your answer here`, // Use current user's name
        posts: 0, 
        views: 0, 
        pinned: false, 
        locked: false, 
        tags: [], 
        author: 'Faculty', 
        answer: '' 
      }
    ];
    const fetchedThread = threads.find(t => t.id === parseInt(id));
    setThread(fetchedThread);

    // Load posts from local storage
    const storedPosts = JSON.parse(localStorage.getItem(`posts-${id}`)) || [];
    setPosts(storedPosts);
  }, [id]);

  const handleCreatePost = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem(`posts-${id}`, JSON.stringify(updatedPosts));
  };

  const handleUpvote = (postId) => {
    const updatedPosts = posts.map(post => post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post);
    setPosts(updatedPosts);
    localStorage.setItem(`posts-${id}`, JSON.stringify(updatedPosts));
  };

  const sortedPosts = posts.sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === 'mostUpvoted') {
      return b.upvotes - a.upvotes;
    }
    return 0;
  });

  if (!thread) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container thread my-4">
      <h1 className="my-4">{thread.title}</h1>
      <div className="list-group">
        
      </div>

      <div className="sort-options">
        <label htmlFor="sortPosts">Sort by:</label>
        <select id="sortPosts" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="mostUpvoted">Most Upvoted</option>
        </select>
      </div>

      <PostCreationForm onCreate={handleCreatePost} />
      <div className="list-group mt-4">
        {sortedPosts.map(post => (
          <div key={post.id} className="list-group-item">
            <p>{post.content}</p>
            <small>By {post.author} on {post.date}</small>
            <div className="post-actions">
              <button onClick={() => handleUpvote(post.id)}>Upvote ({post.upvotes})</button>
              <Link to={`/forum/post/${post.id}`} className="btn btn-link">View Post</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thread;
