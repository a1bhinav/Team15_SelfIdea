import React, { useState } from "react";

const PDFUploader: React.FC = () => {
  // React function component to upload a pdf to the backend
  const [file, setFile] = useState<File | null>(null); // This stores the file uploaded by the user. Null when no file has been selected
  const [extractedText, setExtractedText] = useState<string>(""); // Stores extracted text from the pdf

  // on an event where the input changes (when the user uploads a file in the input tag),
  // this function sets the file. If the file is undefined, set it to null
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const uploadPDF = async () => {
    // Called on click of the upload button
    if (!file) return alert("Please select a PDF file first."); // Checks if file is null

    // Adds the file to formData to send as a part of the POST call to the backend
    const formData = new FormData();
    formData.append("pdfFile", file);

    // Try-catch to POST the pdf file to the backend
    try {
      const res = await fetch("http://localhost:5000/api/parse-pdf", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setExtractedText(data.text);
      } else {
        alert(
          "Failed to parse your pdf. Please upload an uncorrupted pdf file and try again."
        );
        throw new Error("Failed to parse your pdf.");
      }
    } catch (err) {
      alert("Something went wrong. Please try again later");
      console.error("Error uploading file:", err);
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={uploadPDF}>Upload</button>
      {extractedText && ( // If extractedText is empty, it will not show the Extracted Text heading
        <div>
          <h3>Extracted Text:</h3>
          <pre>{extractedText}</pre>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
