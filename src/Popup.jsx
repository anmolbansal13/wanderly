import React, { useState, useEffect } from "react";
import "./Popup.css"; // Add your custom styles here

const Popup = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => setIsLogin(!isLogin);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.className === "popup-overlay") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form>
          {!isLogin && (
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter username" />
            </div>
          )}
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter password" />
          </div>
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <button className="switch-btn" onClick={handleSwitch}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
