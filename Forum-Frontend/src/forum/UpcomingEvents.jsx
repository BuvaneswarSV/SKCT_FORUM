import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './UpcomingEvents.css'; // Import the CSS for styling

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const { currentUser: user } = useAuth();

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handlePostEvent = (e) => {
    e.preventDefault();
    if (user && user.role === 'faculty') {
      const updatedEvents = [...events, { ...newEvent, id: Date.now() }];
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setNewEvent({ title: '', date: '', description: '' });
    } else {
      alert('Only faculty members can post events.');
    }
  };

  return (
    <div className="upcoming-events">
      <h2>Upcoming Events</h2>
      {user && user.role === 'faculty' && (
        <form className="event-form" onSubmit={handlePostEvent}>
          <h3>Post a New Event</h3>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="date"
            placeholder="Event Date"
            value={newEvent.date}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={newEvent.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit">Post Event</button>
        </form>
      )}
      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-item">
            <h4>{event.title}</h4>
            <p>{event.date}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
