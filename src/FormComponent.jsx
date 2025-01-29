import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "./logo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./FormComponent.css";

export default function FormComponent() {
  let navigate = useNavigate();

  function handleAddClick(event) {
    event.preventDefault();
    navigate("/import");
  }

  function handleLogoutClick(event) {
    event.preventDefault();
    console.log("Logged out");
    navigate("/login"); 
  }

  return (
    <div className="form-component">
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
        <div className="navbar-righty">
          <button
            type="button"
            className="logout-button"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="logout-button-container">
        <button
          type="button"
          className="expand-button"
          onClick={handleAddClick}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
