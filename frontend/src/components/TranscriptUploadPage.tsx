import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'; 
import './TranscriptUploadPage.css';

const TranscriptUploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please choose a file first.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const res = await fetch('http://localhost:5001/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });
      
      // Dump status + raw body
      const text = await res.text();
      console.log('[Upload] status:', res.status, 'body:', text);
      if (!res.ok) {
        throw new Error(text || `HTTP ${res.status}`);
      }
      const payload = JSON.parse(text);
      console.log('[Upload] parsed JSON:', payload);
      navigate('/transcript-review', { state: { parsed: payload.courses } });
    } catch (err: any) {
      console.error('[Upload] error:', err);
      setError(err.message || 'Unknown network or parse error.');
    }
    
  };

  return (
    <div className="transcript-upload-container">
      <NavBar />
      <main className="transcript-content">
        <div className="centered-content">
          <h1 className="transcript-title">
            Drop your <span className="red-text">transcript</span> here!
          </h1>

          <form className="transcript-form" onSubmit={handleSubmit}>
            <div className="upload-box">
              <label htmlFor="transcript-file" className="upload-label">
                {selectedFile ? selectedFile.name : "Click or Drop File"}
              </label>
              <input 
                type="file" 
                id="transcript-file" 
                accept=".pdf, .doc, .docx, .txt"
                className="file-input"
                onChange={handleFileChange}
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Parsing…' : 'Submit'}
            </button>
          </form>
        </div>

        <p className="transcript-instructions">
          This will let us extract your course history and grades to populate your academic plan.
        </p>
      </main>
    </div>
  );
};

export default TranscriptUploadPage;
