import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlusCircle, FaFire, FaBell, FaUser, FaFolder, FaBullhorn, FaCalendarAlt, FaLightbulb, FaCommentAlt, FaRegStickyNote } from 'react-icons/fa';
import './ForumHome.css';
import { useAuth } from '../context/AuthContext';
import ThreadCreationForm from './ThreadCreationForm';
import axios from '../services/axiosConfig';

const ForumHome = () => {
  const [threads, setThreads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showThreadForm, setShowThreadForm] = useState(false);
  const { currentUser: user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      axios.get(`/auth/user?email=${user.email}`)
        .then(response => {
          setUserDetails(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the user details!", error);
        });
    }
  }, [user]);

  useEffect(() => {
    axios.get('/threads')
      .then((response) => {
        setThreads(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the threads!", error);
      });
  }, []);

  const handleCreateThread = (title, description) => {
    if (user) {
      const newThread = {
        title,
        description,
        author: { id: userDetails ? userDetails.id : 1 }, // Ensure this ID matches an existing user
        views: 0,
        replies: 0,
        likes: 0,
        comments: 0,
        answered: false,
        createdAt: new Date().toISOString()
      };
  
      axios.post('http://localhost:8080/api/threads', newThread)
        .then((response) => {
          setThreads([response.data, ...threads]);
          setShowThreadForm(false);
        })
        .catch((error) => {
          console.error("There was an error creating the thread!", error.response ? error.response.data : error.message);
        });
    }
  };

  const handleDeleteThread = (threadId) => {
    axios.delete(`/threads/${threadId}`).then(() => {
      setThreads(threads.filter(thread => thread.id !== threadId));
    }).catch((error) => {
      console.error("There was an error deleting the thread!", error);
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="forum-home">
      <header className="forum-header">
        <div className="forum-logo">
          <h1>College Forum</h1>
        </div>
        {/* <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form> */}
      </header>
      <div className="forum-container">
        <nav className="forum-sidebar">
          <div className="sidebar-item">
            <FaPlusCircle className="sidebar-icon" />
            <Link to="#" className="sidebar-link" onClick={() => setShowThreadForm(true)}>Create Thread</Link>
          </div>
          <div className="sidebar-item">
            <FaBullhorn className="sidebar-icon" />
            <Link to="/announcements" className="sidebar-link">Announcements</Link>
          </div>
          
          <div className="sidebar-item">
            <FaCalendarAlt className="sidebar-icon" />
            <Link to="/upcoming-events" className="sidebar-link">Upcoming Events</Link>
          </div>
          
          <div className="sidebar-item">
            <FaLightbulb className="sidebar-icon" />
            <Link to="/inspirational-quotes" className="sidebar-link">Inspirational Quotes</Link>
          </div>
          <div className="sidebar-item">
            <FaCommentAlt className="sidebar-icon" />
            <Link to="/feedback" className="sidebar-link">Feedback</Link>
          </div>
          <div className="sidebar-item">
            <FaRegStickyNote className="sidebar-icon" />
            <Link to="/community-guidelines" className="sidebar-link">Community Guidelines</Link>
          </div>
          
        </nav>
        <main className="forum-content">
          {showThreadForm && <ThreadCreationForm onCreate={handleCreateThread} onClose={() => setShowThreadForm(false)} />}
          <h2>Forum Home</h2>
          <ul className="thread-list">
            {threads.map(thread => (
              <li key={thread.id} className="thread-item">
                <Link to={`/forum/thread/${thread.id}`}>
                  <h3>{thread.title}</h3>
                  <p>{thread.description}</p>
                </Link>
                {userDetails && userDetails.role === 'faculty' && (
                  <button onClick={() => handleDeleteThread(thread.id)}>Delete</button>
                )}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default ForumHome;
