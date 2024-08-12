import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import './UserProfile.css';

const UserProfile = () => {
  const { id } = useParams();
  const { currentUser } = useAuth(); // Get current user from context
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if currentUser is available and matches the ID from params
    if (currentUser && currentUser.id === parseInt(id, 10)) {
      setUser(currentUser);
    } else {
      // Handle case when user is not found or ID does not match
      setUser(null);
    }
  }, [id, currentUser]);

  if (user === null) return <div>User not found or ID does not match.</div>;

  return (
    <div className="container user-profile my-4">
      <div className="avatar" style={{ backgroundImage: `url(https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg)` }}></div>
      <h1>{user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> Hello I am {user.name}</p>
    </div>
  );
};

export default UserProfile;
