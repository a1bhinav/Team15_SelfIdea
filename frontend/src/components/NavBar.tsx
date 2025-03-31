import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">CourseCraft</div>
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/planner">Course Planner</Link>
        <Link to="/transcript">Transcript</Link>
        <Link to="/contact">Log Out</Link>
      </div>
    </nav>
  );
};

export default NavBar;
