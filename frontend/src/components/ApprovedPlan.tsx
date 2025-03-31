import React from "react";
import NavBar from "./NavBar";
import "./ApprovedPlan.css";

const ApprovedPlan: React.FC = () => {
  return (
    <div className="approved-plan-container">
      <NavBar />
      <main className="approved-plan-content">
        <h1 className="approved-plan-title">Your plan looks great!</h1>
        <p className="approved-plan-message">Would you like to save this plan?</p>
        <div className="approved-plan-actions">
          <button className="save-button">Save Plan</button>
          <button className="edit-button">Edit Plan</button>
        </div>
      </main>
    </div>
  );
};

export default ApprovedPlan;
