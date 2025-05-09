import React from "react";
import NavBar from "./NavBar";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
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
        <div className="saved-templates">
          <div className="template-card">
            <h3 className="template-title">Template 1</h3>
            <p className="template-description">
              Placeholder for saved template 1.
            </p>
          </div>

          <div className="template-card">
            <h3 className="template-title">Template 2</h3>
            <p className="template-description">
              Placeholder for saved template 2.
            </p>
          </div>

          <div className="template-card">
            <h3 className="template-title">Template 3</h3>
            <p className="template-description">
              Placeholder for saved template 3.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ProfilePage;
