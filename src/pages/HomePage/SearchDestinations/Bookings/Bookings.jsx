import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookings.css";
const url = "http://localhost:3000";

const Bookings = ({
  isLoggedIn,
  setLoginPopup,
  cityName,
  fromCity,
  selectedDate,
}) => {
  const navigate = useNavigate();

  const handleStartTrip = async () => {
    if (isLoggedIn) {
      await navigate(`/offtrip/${encodeURIComponent(cityName)}`);
    } else {
      setLoginPopup("/offtrip");
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

  const [price, setPrice] = useState(null);

  const handleSearch = async ({ cityName, fromCity }) => {
    try {
      console.log(cityName, fromCity);
      const flightPrice = await searchFlights({ cityName, fromCity });
      setPrice(flightPrice);
    } catch (error) {
      console.error("Failed to fetch flight prices:", error);
    }
  };

  return (
    <div className="bookings-container">
      <h1 className="bookings-title">Bookings</h1>
      <div className="booking-options">
        <div
          className="booking-card"
          onClick={async () => await handleSearch({ cityName, fromCity })}
        >
          <div className="booking-icon">{"✈️"}</div>
          <h2 className="booking-name">
            Flights starting ₹ {price ? price + "/-" : "..."}
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
