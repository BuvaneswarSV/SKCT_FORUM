import React, { useState, useEffect } from 'react';
import './Announcements.css';
import { useAuth } from '../context/AuthContext';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const { currentUser: user } = useAuth();

  useEffect(() => {
    // Load announcements from local storage
    const storedAnnouncements = JSON.parse(localStorage.getItem('announcements')) || [];
    setAnnouncements(storedAnnouncements);
  }, []);

  const handleCreateAnnouncement = () => {
    if (user && user.role === 'faculty' && newAnnouncement.trim()) {
      const newAnn = {
        id: Date.now(),
        text: newAnnouncement,
        author: user.email
      };
      const updatedAnnouncements = [newAnn, ...announcements];
      setAnnouncements(updatedAnnouncements);
      setNewAnnouncement('');

      // Save the updated announcements to local storage
      localStorage.setItem('announcements', JSON.stringify(updatedAnnouncements));
    }
  };

  return (
    <div className="announcements">
      <h2>Announcements</h2>
      {user.role === 'faculty' && (
        <div className="announcement-creation">
          <input
            type="text"
            placeholder="Write an announcement..."
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
          />
          <button onClick={handleCreateAnnouncement}>Post Announcement</button>
        </div>
      )}
      <ul className="announcement-list">
        {announcements.map(announcement => (
          <li key={announcement.id} className="announcement-item">
            <p>{announcement.text}</p>
            <span className="announcement-author">Posted by: {announcement.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
