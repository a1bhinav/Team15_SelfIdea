import React from "react";
import NavBar from "./NavBar";
import "./RejectedPlan.css";

interface RejectedPlanProps {
  errorMessage?: string;
}

const RejectedPlan: React.FC<RejectedPlanProps> = ({
  errorMessage = " Please review the prerequisites and try again.",
}) => {
    
  return (
    <div className="rejected-plan-container">
      <NavBar />
      <main className="rejected-plan-content">
        <h1 className="rejected-plan-title">Uh oh, there's an issue.</h1>
        <p className="rejected-plan-message">{errorMessage}</p>
        <div className="rejected-plan-actions">
          <button className="try-again-button">Try Again</button>
        </div>
      </main>
    </div>
  );
};

export default RejectedPlan;
