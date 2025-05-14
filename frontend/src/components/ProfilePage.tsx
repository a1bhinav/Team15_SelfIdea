import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";

interface Template {
  id: string;
  title: string;
  description: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDesc, setNewDesc] = useState<string>("");

  useEffect(() => {
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
          courseTemplateName: templateId,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Failed to parse error response." }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      setTemplates(prev => prev.filter(t => t.id !== templateId));
      alert("Template removed successfully!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while removing the template.");
      }
      console.error("Failed to remove template:", err);
    }
  };

  const handleAddTemplate = async () => {
    setError(null);
    const studentId = "20202020";
    try {
      const response = await fetch("http://localhost:5000/api/append-course-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          courseTemplate: {
            name: newTitle,
            description: newDesc,
          },
        }),
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      const raw = result.student.courseTemplates[
        result.student.courseTemplates.length - 1
      ];

      const created: Template = {
        id: raw.name,
        title: raw.name,
        description: raw.description,
      };

      setTemplates(prev => [...prev, created]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while adding the template.");
      }
      console.error("Failed to add template:", err);
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

        <div className="add-template-form">
          <input
            type="text"
            placeholder="Template Title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="add-template-input"
          />
          <textarea
            placeholder="Template Description"
            value={newDesc}
            onChange={e => setNewDesc(e.target.value)}
            className="add-template-input"
          />
          <button
            onClick={handleAddTemplate}
            className="add-template-button"
            disabled={!newTitle.trim() || !newDesc.trim()}
          >
            Add Template
          </button>
        </div>

        <div className="saved-templates">
          {templates.length > 0 ? (
            templates.map(template => (
              <div
                key={template.id}
                className="template-card"
                onClick={() => navigate(`/template/${template.id}`)}
                style={{ cursor: "pointer" }}
              >
                <h3 className="template-title">{template.title}</h3>
                <p className="template-description">{template.description}</p>
                <button
                  className="remove-template-button"
                  onClick={e => {
                    e.stopPropagation()
                    handleRemoveTemplate(template.id)
                  }}
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
