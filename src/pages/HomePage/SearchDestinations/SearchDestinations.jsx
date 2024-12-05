import React, { useState } from "react";
import Carousel from "./Carousel/Carousel.jsx";
import Bookings from "./Bookings/Bookings.jsx";
import SearchForm from "./SearchForm/SearchForm.jsx";
import "./SearchDestinations.css";
export default function SearchDestinations({ isLoggedIn, setLoginPopup }) {
  const [selectedCity, setSelectedCity] = useState();
  // "ChIJP9A_FgiHBDkRzXZQvg6oKYE"
  const [fromCity, setFromCity] = useState(null);
  const [cityName, setCityName] = useState();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  return (
    <div className="searchDestinations">
      {!selectedCity ? (
        <div className="alternate-text">
          <span className="welcome-text">Welcome to Wanderly</span>
          <h2 className="subtitle">Your Journey Begins Here</h2>
          <h1 className="main-title typewriter">Discover Your Next Adventure</h1>
          <p className="instruction">
            Select a destination to explore amazing places
          </p>
        </div>
      ) : (
        <></>
      )}
      <SearchForm
        onCitySelect={setSelectedCity}
        setFromCity={setFromCity}
        setCityName={setCityName}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      {selectedCity ? (
        <div className="search-results">
          <Carousel selectedCity={selectedCity} />
          <Bookings
            isLoggedIn={isLoggedIn}
            setLoginPopup={setLoginPopup}
            cityName={cityName}
            fromCity={fromCity}
            selectedDate={selectedDate}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
