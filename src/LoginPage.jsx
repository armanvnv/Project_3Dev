import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';
import logoImage from './logo.png'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      const data =   JSON.parse(JSON.stringify({
         
        
        
      }))
    const response = await axios.post('https://rc-work-flow.vercel.app/api/login', { 
      
      email: username,
      password: password,});
      console.log(response)
      if (response.status === 201) {
        // localStorage.setItem('firstName', firstName);
        // localStorage.setItem('lastName', lastName);
        // localStorage.setItem('email', email);
        // localStorage.setItem('password', password);
        
        navigate('/form');
      } else {
        setError('Login failed . Please try again.');
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred. Please try again.');
    }

  };

  return (
    <div className="login-container">
      <div className="navbar-o">
        <div className="navbar-lefty">
          <img src={logoImage} alt="Logo" className="navbar-logo" />
          <div>
            <div className="navbar-subtitles">
              <span className="navbar-subtitle">
                <i className="fas fa-home"></i> Home
              </span>
              <span className="navbar-subtitle">
                <i className="fas fa-address-book"></i> ContactNo.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="login-form">
        <h2 className="login-title">Login Page</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <br />
          <button type="submit" className="login-button">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
  
};

export default LoginPage;
