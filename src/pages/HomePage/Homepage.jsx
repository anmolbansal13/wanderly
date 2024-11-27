import React from "react";
import SearchDestinations from "./SearchDestinations/SearchDestinations";
import FeaturedDestinations from "./FeaturedDestinations/FeaturedDestinations";
import "./Homepage.css";

export default function Homepage({ isLoggedIn, setLoginPopup }) {
  return (
    <div className="main-body">
      <SearchDestinations
        isLoggedIn={isLoggedIn}
        setLoginPopup={setLoginPopup}
      />
      <FeaturedDestinations />
    </div>
  );
}