import React from "react";
import SearchDestinations from "../../components/SearchDestinations/SearchDestinations.jsx";
import FeaturedDestinations from "../../components/FeaturedDestinations/FeaturedDestinations";
import "./Homepage.css";

export default function Homepage({ isLoggedIn, setLoginPopup }) {
  return (
    <div className="main-body">
      <SearchDestinations
        isLoggedIn={isLoggedIn}
        setLoginPopup={setLoginPopup}
      />
      <FeaturedDestinations
        isLoggedIn={isLoggedIn}
        setLoginPopup={setLoginPopup}
      />
    </div>
  );
}
