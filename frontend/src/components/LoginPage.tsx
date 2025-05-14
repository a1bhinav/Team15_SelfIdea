import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="title">CourseCraft</h1>
        <p className="tagline">
          Plan, Track, and Achieve Your Academic Goals—<em>Effortlessly</em>.
        </p>

        <div className="calendar-icon" aria-label="calendar-icon">
          <span role="img" aria-label="calendar">📅</span>
        </div>

        <form className="login-form">
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
            <button type="button" className="login-button">
              Log in
            </button>
          </div>
        
          <div className="google-login">
            <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await axios.post('http://localhost:5000/api/auth/google', {
                  token: credentialResponse.credential,
                });
                console.log('User found:', res.data);
              } catch (err) {
                console.error('Google login error:', err);
              }
            }}
            onError={() => {
              console.error('Google login failed');
            }}
            />
          </div>
        </form>

        <footer className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
