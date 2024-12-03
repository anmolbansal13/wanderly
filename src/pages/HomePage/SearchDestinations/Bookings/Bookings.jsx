import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookings.css";
const url = import.meta.env.VITE_BACKEND_URL;

const Bookings = ({
  isLoggedIn,
  setLoginPopup,
  cityName,
  fromCity,
  selectedDate,
}) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState(null);

  const [isCity, setIsCity] = useState(false);

  useEffect(() => {
    if (cityName) {
      setIsCity(true);
    }
    if (cityName === null) {
      setIsCity(false);
    }
  }, [cityName]);

  const [lastSearch, setLastSearch] = useState({ cityName: "", fromCity: "" });

  const handleStartTrip = async () => {
    if (isLoggedIn) {
      await navigate(`/offtrip/${encodeURIComponent(cityName)}`);
    } else {
      setLoginPopup(`/offtrip/${encodeURIComponent(cityName)}`);
    }
  };

  const searchFlights = async ({ cityName, fromCity }) => {
    try {
      //console.log(arrivalQuery, departureQuery);
      const response = await fetch(`${url}/lowest-flight-price`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          arrivalQuery: cityName,
          departureQuery: fromCity,
          date: selectedDate,
        }),
      });

      const data = await response.json();
      return data; // This will return the price from best_flights[0]
    } catch (error) {
      console.error("Error fetching flights:", error);
      throw error;
    }
  };

  const handleSearchFlights = async () => {
    if (
      cityName &&
      fromCity &&
      cityName !== fromCity &&
      (cityName !== lastSearch.cityName || fromCity !== lastSearch.fromCity)
    ) {
      try {
        const flightPrice = await searchFlights({ cityName, fromCity });
        setPrice(flightPrice);
        setLastSearch({ cityName, fromCity });
      } catch (error) {
        console.error("Failed to fetch flight prices:", error);
      }
    }
  };

  return (
    <div className="bookings-container">
      <h1 className="bookings-title">Bookings</h1>
      <div className="booking-options">
        <div className="booking-card" onClick={handleSearchFlights}>
          <div className="booking-icon">{"✈️"}</div>
          <h2 className="booking-name">
            Flights starting ₹ {price ? price + "/-" : "....."}
          </h2>
        </div>
        <div className="booking-card">
          <div className="booking-icon">{"🏨"}</div>
          <h2 className="booking-name">{"Hotels"}</h2>
        </div>
        <div className="booking-card">
          <div className="booking-icon">{"🚍"}</div>
          <h2 className="booking-name">{"Bus/Cabs"}</h2>
        </div>
        <div
          className="booking-card"
          diabled={isCity}
          onClick={isCity && handleStartTrip}
          style={{ cursor: "pointer" }}
        >
          <div className="booking-icon">{"..."}</div>
          <h2 className="booking-name">
            {isCity ? "Start a Trip" : "Choose Destination"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
