import React, { useState } from "react";
import Carousel from "./Carousel/Carousel.jsx";
import Bookings from "./Bookings/Bookings.jsx";
import SearchForm from "./SearchForm/SearchForm.jsx";
import "./SearchDestinations.css";
export default function SearchDestinations({ isLoggedIn, setLoginPopup }) {
  const [selectedCity, setSelectedCity] = useState(null);
  return (
    <div className="searchDestinations">
      <SearchForm onCitySelect={setSelectedCity} />
      <div className="search-results">
        <Carousel selectedCity={selectedCity} />
        <Bookings isLoggedIn={isLoggedIn} setLoginPopup={setLoginPopup} />
      </div>
    </div>
  );
}
