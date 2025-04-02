import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import './TranscriptReviewPage.css';

const TranscriptReviewPage: React.FC = () => {
  const [transcriptData, setTranscriptData] = useState<{ name?: string; major?: string; courses?: string[] }>({});

  useEffect(() => {
    // Retrieve parsed transcript from localStorage
    const parsedTranscript = JSON.parse(localStorage.getItem('parsedTranscript') || '{}');
    console.log(parsedTranscript);
    setTranscriptData({
      name: "N/A",
      major: "N/A",
      courses: parsedTranscript.text,
    });
  }, []);
  // console.log(parsedTranscript);
  console.log("Hi");
  console.log(transcriptData.courses);

  return (
    <div className="transcript-review-container">
      <NavBar />

      <main className="transcript-review-content">
        <h1 className="transcript-review-title">Please review your transcript!</h1>

        <div className="parsed-transcript">
          <p><strong>Name:</strong> {transcriptData.name || 'N/A'}</p>
          <p><strong>Major:</strong> {transcriptData.major || 'N/A'}</p>

          <h2>Courses:</h2>
          <ul>
            {/* {transcriptData.courses && transcriptData.courses.length > 0 ? (
              transcriptData.courses.map((course, index) => <li key={index}>{course}</li>)
            ) : (
              <p>No courses found.</p>
            )} */
            }
            <p>transcriptData.courses</p>
          </ul>
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
