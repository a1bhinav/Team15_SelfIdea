import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'; 
import './TranscriptUploadPage.css';

const TranscriptUploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //need to connect this to pdf parser
    navigate('/transcript-review');
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
            <button type="submit" className="submit-button">
              Submit
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
