import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';
import logoImage from './logo.png'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const RegisterPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {

    const data =   JSON.parse(JSON.stringify({
       
      
      
    }))
       response = await axios.post('https://rc-work-flow.vercel.app/api/register', { firstName: firstName,
        constlastName: lastName,
        email: email,
        password: password,});

    console.log(response)
      if (response.status === 201) {
        // localStorage.setItem('firstName', firstName);
        // localStorage.setItem('lastName', lastName);
        // localStorage.setItem('email', email);
        // localStorage.setItem('password', password);
        
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-container">
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
      <div className="register-form">
        <h2 className="register-title">Register Here</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="register-input"
            required
          />
          <br />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="register-input"
            required
          />
          <br />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            required
          />
          <br />
          
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
