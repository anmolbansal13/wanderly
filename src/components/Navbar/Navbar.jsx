import React, { useState, useEffect, useRef } from "react";
import LoginPopup from "../LoginPopup/LoginPopup";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;
export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for dropdown

  const goToHome = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });
      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <h1 className="websiteName" onClick={goToHome}>
        Wanderly
      </h1>

      {isLoggedIn ? (
        <div
          className="profile-container"
          ref={dropdownRef} // Attach ref to container
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <i className="fa-solid fa-user usericon"></i>
          {showDropdown && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                style={{ "--item-index": 0 }}
                onClick={() => navigate("/profile")}
              >
                Profile
              </div>
              <div
                className="dropdown-item"
                style={{ "--item-index": 1 }}
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <button className="loginSignupBtn" onClick={() => setPopupOpen(true)}>
          LOG IN / SIGN UP
        </button>
      )}
      <LoginPopup
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  );
}
