import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import './TranscriptReviewPage.css';

type Entry = {
  course: { id: string; name: string; credits: number };
  grade: string;
  term: string;
};

const TranscriptReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const entries = (location.state as any)?.parsed as Entry[] | undefined;

  if (!entries || entries.length === 0) {
    return (
      <div className="transcript-review-container">
        <NavBar />
        <main className="transcript-review-content">
          <h2>No transcript data found</h2>
          <button onClick={() => navigate('/transcript')}>
            Upload Transcript
          </button>
        </main>
      </div>
    );
  }

  const grouped: Record<string, Entry[]> = {};
  const termOrder: string[] = [];

  entries.forEach((e) => {
    const term = e.term || 'Unknown Term';
    if (!grouped[term]) {
      grouped[term] = [];
      termOrder.push(term);
    }
    grouped[term].push(e);
  });

  return (
    <div className="transcript-review-container">
      <NavBar />
      <main className="transcript-review-content">
        <h1 className="transcript-review-title">
          Please review your transcript!
        </h1>

        <div className="parsed-transcript">
          {termOrder.map((term) => (
            <section key={term} className="term-group">
              <h2 className="term-header">{term}</h2>
              {grouped[term].map((e, i) => (
                <div key={i} className="course-row">
                  <span className="course-id">{e.course.id}</span>
                  <span className="course-name">{e.course.name}</span>
                  <span className="course-credits">
                    {e.course.credits.toFixed(1)} cr
                  </span>
                  <span className="course-grade">{e.grade}</span>
                </div>
              ))}
            </section>
          ))}
        </div>

        <div className="review-actions">
          <button
            className="looks-good-button"
            onClick={() => navigate('/profile')}
          >
            Looks good!
          </button>
          <button
            className="edit-button"
            onClick={() => navigate('/transcript')}
          >
            Edit
          </button>
        </div>
      </main>
    </div>
  );
};

export default TranscriptReviewPage;
