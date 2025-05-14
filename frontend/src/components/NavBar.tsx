// src/components/NavBar.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: clear any auth state/storage here if needed
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">CourseCraft</div>
      <div className="navbar-links">
        <Link to="/profile">Dashboard</Link>
        <Link to="/transcript">Transcript</Link>
        <Link to="/about-us">About Us</Link>
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
