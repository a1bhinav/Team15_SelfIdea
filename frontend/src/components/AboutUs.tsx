// components/AboutUs.tsx
import React from "react";
import NavBar from "./NavBar";
import "./AboutUs.css";

const AboutUs: React.FC = () => {
  return (
    <div className="about-container">
      <NavBar />

      {/* this will take all the free space and center its children vertically */}
      <main className="about-content">
        <h1 className="about-title">About Us</h1>
        <p className="about-description">
          CourseCraft was born out of the need for a streamlined way for college
          students to plan their entire academic journey. Our platform provides
          an intuitive eight‑semester roadmap, validates your plan against
          prerequisites and degree requirements, and offers both custom and
          templated paths so you can graduate on your own terms.
        </p>
        <p className="about-description">
          Students simply upload their past coursework—either manually or via
          SPIRE transcripts—and then pick future classes to satisfy credits and
          prerequisites. Peer mentors and academic advisors can review these
          plans before meetings, making advising sessions faster and more
          impactful. Powered by configurable curriculum files (we’re using UMass
          CS as our example), CourseCraft adapts to any major’s needs.
        </p>
      </main>

      {/* this will live at the bottom as a smaller box */}
      <footer className="contact-info">
        <h2>Contact Us</h2>
        <ul>
          <li><strong>Email:</strong> support@coursecraft.example.com</li>
          <li><strong>Phone:</strong> (555) 123‑4567</li>
          <li><strong>Address:</strong> 123 Academic Way, Amherst, MA 01003</li>
        </ul>
      </footer>
    </div>
  );
};

export default AboutUs;
