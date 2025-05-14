import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./ProfilePage.css";

interface Template {
  id: string; // Or number, depending on your backend
  title: string;
  description: string;
}

const ProfilePage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Replace with your actual API endpoint to fetch user-specific templates
    const fetchTemplates = async () => {
      try {
        // Assuming the backend route to get user templates is something like /api/user/templates
        // You might need to pass user identification (e.g., from auth context or session)
        // Updated to call /api/student-templates with spireID=20202020
        const spireID = localStorage.getItem("spireID");
        if (!spireID) throw new Error("Missing spireID. Please log in again.");
        const response = await fetch(`http://localhost:5000/api/student-templates?spireID=${spireID}`); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTemplates(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred while fetching templates.");
        }
        console.error("Failed to fetch templates:", err);
      }
    };

    fetchTemplates();
  }, []);

  const handleRemoveTemplate = async (templateId: string) => {
    // templateId here is expected to be the name of the template, matching courseTemplateName on the backend
    setError(null); // Clear previous errors
    const studentIdToRemoveFrom = localStorage.getItem("spireID");
    if (!studentIdToRemoveFrom) {
      setError("Missing spireID. Please log in again.");
      return;
    } // TODO: Replace with actual student ID from auth or context

    try {
      const response = await fetch("http://localhost:5000/api/remove-course-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentIdToRemoveFrom,
          courseTemplateName: templateId, // templateId from function argument is the name
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Failed to parse error response." }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      // Remove the template from the local state to update the UI
      setTemplates(prevTemplates => prevTemplates.filter((template) => template.id !== templateId));
      alert("Template removed successfully!"); // Optional: give user feedback
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while removing the template.");
      }
      console.error("Failed to remove template:", err);
    }
  };

  return (
    <div className="profile-container">
      <NavBar />
      <main className="profile-content">
        <h1 className="profile-title">My Dashboard</h1>

        <div className="profile-details-block">
          <div className="info-item">
            <span className="info-label">Name:</span>
            <span className="info-value">John Doe</span>
          </div>

          <div className="info-item">
            <span className="info-label">Major:</span>
            <span className="info-value">Computer Science</span>
          </div>
          <div className="info-item">
            <span className="info-label">Semester:</span>
            <span className="info-value">Fall 2025</span>
          </div>
          <div className="info-item">
            <span className="info-label">GPA:</span>
            <span className="info-value">3.8</span>
          </div>
        </div>

        <h2 className="saved-templates-title">Saved Templates</h2>
        {error && <p className="error-message">Error: {error}</p>}
        <div className="saved-templates">
          {templates.length > 0 ? (
            templates.map((template) => (
              <div key={template.id} className="template-card">
                <h3 className="template-title">{template.title}</h3>
                <p className="template-description">{template.description}</p>
                <button
                  onClick={() => handleRemoveTemplate(template.id)}
                  className="remove-template-button"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No saved templates found.</p>
          )}
        </div>

      </main>
    </div>
  );
};

export default ProfilePage;