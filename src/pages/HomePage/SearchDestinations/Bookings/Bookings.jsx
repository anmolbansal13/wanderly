import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookings.css";
const url = "http://localhost:3000";

const Bookings = ({ isLoggedIn, setLoginPopup, cityName }) => {
  const navigate = useNavigate();

  const handleStartTrip = async () => {
    if (isLoggedIn) {
      await navigate("/offtrip");
    } else {
      setLoginPopup("/offtrip");
    }
  };

  const searchFlights = async (arrivalQuery) => {
    try {
      const response = await fetch(`${url}/lowest-flight-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ arrivalQuery: arrivalQuery }),
      });
      
      const data = await response.json();
      return data; // This will return the price from best_flights[0]
    } catch (error) {
      console.error('Error fetching flights:', error);
      throw error;
    }
  };

  const [price, setPrice] = useState(null);
  
  const handleSearch = async (destination) => {
    try {
      const flightPrice = await searchFlights(destination);
      setPrice(flightPrice);
    } catch (error) {
      console.error('Failed to fetch flight prices:', error);
    }
  };

  return (
    <div className="bookings-container">
      <h1 className="bookings-title">Bookings</h1>
      <div className="booking-options">
        <div className="booking-card" onClick={() => handleSearch(cityName)}>
          <div className="booking-icon">{"✈️"}</div>
          <h2 className="booking-name">Flights starting ₹ {price ? price+'/-' : "..."}</h2>
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
          onClick={handleStartTrip}
          style={{ cursor: "pointer" }}
        >
          <div className="booking-icon">{"..."}</div>
          <h2 className="booking-name">{"Start a Trip"}</h2>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
