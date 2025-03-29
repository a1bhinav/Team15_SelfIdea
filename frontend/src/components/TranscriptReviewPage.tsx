import React from 'react';
import NavBar from './NavBar';
import './TranscriptReviewPage.css';

const TranscriptReviewPage: React.FC = () => {
  return (
    <div className="transcript-review-container">
      <NavBar />

      <main className="transcript-review-content">
        <h1 className="transcript-review-title">Please review your transcript!</h1>

        <div className="parsed-transcript">
          <p>
          Name - John Doe  
          </p>
          <p>
          Major -  Computer Science 
          </p>
          <p>
          Name - John Doe  
          </p>
          <p>
          Major -  Computer Science 
          </p>
          <p>
          Name - John Doe  
          </p>
          <p>
          Major -  Computer Science 
          </p>
          <p>
          Name - John Doe  
          </p>
          <p>
          Major -  Computer Science 
          </p>
          <p>
          Name - John Doe  
          </p>
          <p>
          Major -  Computer Science 
          </p>
          <p>
          Name - John Doe  
          </p>
          <p>
          Major -  Computer Science 
          </p>
          <p>
          Name - John Doe  
          </p>
          <p>
          Major -  Computer Science 
          </p><p>
          Name - John Doe  
          </p>
          <p>
          Major -  Computer Science 
          </p><p>
          Name - John Doe  
          </p>
          <p>
          Major -  Computer Science 
          </p><p>
          Name - John Doe  
          </p>
          <p>
          Major -  Computer Science 
          </p>

        </div>

        <div className="review-actions">
          <button className="looks-good-button">Looks good!</button>
          <button className="edit-button">Edit</button>
        </div>
        
      </main>
    </div>
  );
};

export default TranscriptReviewPage;
