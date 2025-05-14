// src/components/LoginPage.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mock authentication → navigate to transcript upload
    navigate('/transcript');
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="title">CourseCraft</h1>
        <p className="tagline">
          Plan, Track, and Achieve Your Academic Goals—<em>Effortlessly</em>.
        </p>

        <div className="calendar-icon" aria-label="calendar-icon">
          <span role="img" aria-label="calendar">
            📅
          </span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            required
          />

          <div className="button-group">
            <button type="submit" className="login-button">
              Log in
            </button>
            <button type="button" className="create-account-button">
              Create Account
            </button>
          </div>
        </form>

        <footer className="footer-links">
          <Link to="/about-us">About</Link>
          {/* <Link to="/contact">Contact</Link> */}
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
