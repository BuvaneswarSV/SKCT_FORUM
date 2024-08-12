import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Feed.css'; // Import the CSS for styling

const Feed = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const { currentUser: user } = useAuth();

  // Load feedbacks from local storage on component mount
  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    setFeedbacks(storedFeedbacks);
  }, []);

  // Handle input change for the feedback form
  const handleInputChange = (e) => {
    setNewFeedback(e.target.value);
  };

  // Handle the submission of new feedback
  const handlePostFeedback = (e) => {
    e.preventDefault();
    if (user && user.role === 'student') {
      const newFeedbackItem = { id: Date.now(), text: newFeedback };
      const updatedFeedbacks = [...feedbacks, newFeedbackItem];
      localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
      setFeedbacks(updatedFeedbacks);
      setNewFeedback('');
      alert('Feedback submitted successfully.');
    } else {
      alert('Only students can submit feedback.');
    }
  };

  return (
    <div className="feed">
      <h2>Feedback</h2>
      {user && user.role === 'student' && (
        <form className="feedback-form" onSubmit={handlePostFeedback}>
          <h3>Submit Feedback</h3>
          <textarea
            name="feedback"
            placeholder="Enter your feedback here..."
            value={newFeedback}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit">Submit Feedback</button>
        </form>
      )}
      {user && user.role === 'faculty' && (
        <div className="feedback-list">
          <h3>Submitted Feedback</h3>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <div key={feedback.id} className="feedback-item">
                <p>{feedback.text}</p>
              </div>
            ))
          ) : (
            <p>No feedback submitted yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
