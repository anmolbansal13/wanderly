import React, { useState } from "react";
import LoginPopup from "../LoginPopup/LoginPopup";
import './Navbar.css';

export default function Navbar({ isLoggedIn }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  return (
    <div className="navbar">
      <i class="fa-solid fa-bars hamicon"></i>
      <h1 className="websiteName">Wanderly</h1>
      
      {isLoggedIn ? (
        <i class="fa-solid fa-user usericon"></i>
      ) : (
        <button className="loginSignupBtn" onClick={() => setPopupOpen(true)}>
          LOG IN / SIGN UP
        </button>
      )}
      <LoginPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}
