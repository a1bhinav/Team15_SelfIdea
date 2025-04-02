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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!selectedFile) {
      alert("Please select a transcript file before submitting.");
      return;
    }
  
    const formData = new FormData();
    formData.append("pdfFile", selectedFile);
  
    try {
      const response = await fetch("http://localhost:5001/api/parse-pdf", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload transcript.");
      }
  
      const data = await response.json();
      localStorage.setItem("parsedTranscript", JSON.stringify(data)); // Store parsed data for review page
      navigate("/transcript-review"); // Navigate to review page after successful upload
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Something went wrong. Please try again later.");
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
