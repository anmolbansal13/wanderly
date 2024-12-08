import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Homepage from "./pages/HomePage/Homepage";
import OffTrip from "./pages/OffTrip/OffTrip.jsx";
import OnTrip from "./pages/OnTrip/OnTrip";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const url = import.meta.env.VITE_BACKEND_URL;
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginRedirect, setLoginRedirect] = useState(null);
  const [userTripStatus, setUserTripStatus] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUserTripStatus = async () => {
      if (isLoggedIn) {
        try {
          const response = await fetch(`${url}/userGetTripStatus`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await response.json();
          // console.log(data.tripId);
          setUserTripStatus(data);
          // If user is on trip, redirect to ontrip page
          if (data.onTrip && data.tripId && window.location.pathname === "/") {
            navigate(`/ontrip/${data.tripId}`);
          }
        } catch (error) {
          console.error("Error fetching user status:", error);
        }
      }
    };

    checkUserTripStatus();
  }, [isLoggedIn, navigate]);

  return (
    <div className="App">
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setShowLoginPopup={() => {
          setLoginRedirect(null);
          setShowLoginPopup(true);
        }}
      />
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        redirectPath={loginRedirect}
      />
      <Routes>
        <Route
          path="/"
          element={
            userTripStatus?.onTrip && userTripStatus?.tripId ? (
              <Navigate to={`/ontrip/${userTripStatus.tripId}`} />
            ) : (
              <Homepage
                isLoggedIn={isLoggedIn}
                setLoginPopup={(redirect) => {
                  setLoginRedirect(redirect);
                  setShowLoginPopup(true);
                }}
              />
            )
          }
        />
        <Route path="/offtrip/:cityName" element={<OffTrip />} />
        <Route path="/ontrip/:tripId" element={<OnTrip />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
