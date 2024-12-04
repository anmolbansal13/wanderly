import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Homepage from "./pages/HomePage/Homepage";
import OffTrip from "./pages/OffTrip/OffTrip.jsx";
import OnTrip from "./pages/OnTrip/OnTrip";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import Profile from "./components/Profile/Profile.jsx";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginRedirect, setLoginRedirect] = useState(null);

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
            <Homepage
              isLoggedIn={isLoggedIn}
              setLoginPopup={(redirect) => {
                setLoginRedirect(redirect);
                setShowLoginPopup(true);
              }}
            />
          }
        />
        <Route path="/offtrip/:cityName" element={<OffTrip />} />
        <Route path="/ontrip" element={<OnTrip />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
