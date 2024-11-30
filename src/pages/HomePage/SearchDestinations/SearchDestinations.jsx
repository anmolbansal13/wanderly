import React, { useState } from "react";
import Carousel from "./Carousel/Carousel.jsx";
import Bookings from "./Bookings/Bookings.jsx";
import SearchForm from "./SearchForm/SearchForm.jsx";
import "./SearchDestinations.css";
export default function SearchDestinations({ isLoggedIn, setLoginPopup }) {
  const [selectedCity, setSelectedCity] = useState(
    "ChIJP9A_FgiHBDkRzXZQvg6oKYE"
  );
  const [cityName, setCityName] = useState(null);
  return (
    <div className="searchDestinations">
      <SearchForm onCitySelect={setSelectedCity} setCityName={setCityName} />
      <div className="search-results">
        <Carousel selectedCity={selectedCity} />
        <Bookings
          isLoggedIn={isLoggedIn}
          setLoginPopup={setLoginPopup}
          cityName={cityName}
        />
      </div>
    </div>
  );
}
