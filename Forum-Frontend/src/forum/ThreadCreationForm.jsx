import React, { useState } from 'react';
import './ThreadCreationForm.css';

const ThreadCreationForm = ({ onCreate, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // Add description state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      onCreate(title, description); // Pass both title and description
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="thread-creation-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Thread Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Thread Description</label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Create Thread</button> <br></br><br></br>
      <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
    </form>
  );
};

export default ThreadCreationForm;
