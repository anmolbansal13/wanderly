import React from "react";
import SearchDestinations from "../../components/SearchDestinations/SearchDestinations.jsx";
import FeaturedDestinations from "../../components/FeaturedDestinations/FeaturedDestinations";
import { useState } from "react";
import "./Homepage.css";


export default function Homepage({ isLoggedIn, setLoginPopup }) {
  const [selectedCity, setSelectedCity] = useState(null);
  return (
    <div className="main-body">
      <div className="search-section">
        <SearchDestinations
          isLoggedIn={isLoggedIn}
          setLoginPopup={setLoginPopup}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </div>
      {selectedCity ? (
        <div className="featured-section">
          <FeaturedDestinations
            isLoggedIn={isLoggedIn}
            setLoginPopup={setLoginPopup}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
