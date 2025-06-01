import React, { useState, useEffect } from "react";
import "./LoginPopup.css";

const url = import.meta.env.VITE_BACKEND_URL;

const LoginPopup = ({
  isLoggedIn,
  setIsLoggedIn,
  isOpen,
  onClose,
  redirectPath,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? `${url}/login` : `${url}/signup`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 429) {
        alert("Too many requests, please try again later");
      }
      const data = await response.json();
      if (response.status === 409) {
        throw new Error(data.message);
        //setEmailError(data.message);
      }
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        onClose();
        if (redirectPath) {
          window.location.href = redirectPath;
        }
      } else {
        alert(data.message || "An error occurred");
      }
    } catch (error) {
      //console.log(error);
      alert(error);
    }
  };
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
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <button className="switch-btn" onClick={handleSwitch}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>
        <button className="close-btn" onClick={onClose}>
            &times;
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
