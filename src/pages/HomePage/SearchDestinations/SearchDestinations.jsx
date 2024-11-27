import React from "react";
import Carousel from "./Carousel/Carousel.jsx";
import Bookings from "./Bookings/Bookings.jsx";
import SearchForm from "./SearchForm/SearchForm.jsx";
import "./SearchDestinations.css";
export default function SearchDestinations({ isLoggedIn, setLoginPopup }) {
  return (
    <div className="searchDestinations">
      <SearchForm />
      <div className="search-results">
        <Carousel />
        <Bookings isLoggedIn={isLoggedIn} setLoginPopup={setLoginPopup} />
      </div>
    </div>
  );
}
