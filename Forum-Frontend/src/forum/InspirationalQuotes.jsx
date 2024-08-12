import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './InspirationalQuotes.css'; // Import the CSS for styling

const InspirationalQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState('');
  const { currentUser: user } = useAuth();

  // Load quotes from local storage on component mount
  useEffect(() => {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    setQuotes(storedQuotes);
  }, []);

  // Handle input change for the quote form
  const handleInputChange = (e) => {
    setNewQuote(e.target.value);
  };

  // Handle the submission of a new quote
  const handlePostQuote = (e) => {
    e.preventDefault();
    if (user && user.role === 'faculty') {
      const newQuoteItem = { id: Date.now(), text: newQuote };
      const updatedQuotes = [...quotes, newQuoteItem];
      localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
      setQuotes(updatedQuotes);
      setNewQuote('');
    } else {
      alert('Only faculty members can add quotes or tips.');
    }
  };

  return (
    <div className="inspirational-quotes">
      <h2>Inspirational Quotes or Tips</h2>
      {user && user.role === 'faculty' && (
        <form className="quote-form" onSubmit={handlePostQuote}>
          <h3>Add a New Quote or Tip</h3>
          <textarea
            name="quote"
            placeholder="Enter your quote or tip here..."
            value={newQuote}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit">Add Quote/Tip</button>
        </form>
      )}
      <div className="quotes-list">
        {quotes.length > 0 ? (
          quotes.map((quote) => (
            <div key={quote.id} className="quote-item">
              <p>{quote.text}</p>
            </div>
          ))
        ) : (
          <p>No quotes or tips available.</p>
        )}
      </div>
    </div>
  );
};

export default InspirationalQuotes;
