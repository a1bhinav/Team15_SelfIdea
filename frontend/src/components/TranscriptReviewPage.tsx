import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './TranscriptReviewPage.css';

const TranscriptReviewPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLooksGood = () => {
    navigate('/profile');
  };

  const handleEdit = () => {
    navigate('/transcript');
  };

  return (
    <div className="transcript-review-container">
      <NavBar />

      <main className="transcript-review-content">
        <h1 className="transcript-review-title">Please review your transcript!</h1>

        <div className="parsed-transcript">
          {/* Your parsed transcript data */}
          <p>Name – John Doe</p>
          <p>Major – Computer Science</p>
          {/* ...etc */}
        </div>

        <div className="review-actions">
          <button
            className="looks-good-button"
            onClick={handleLooksGood}
          >
            Looks good!
          </button>
          <button
            className="edit-button"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </main>
    </div>
  );
};

export default TranscriptReviewPage;
