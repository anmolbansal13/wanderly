import React, { useState } from "react";
import Popup from "../HomePage/subcomponents/Popup";

export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => setIsLoggedIn(true);
  
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
      <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}
