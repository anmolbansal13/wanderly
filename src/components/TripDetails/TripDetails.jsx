import React, { useEffect, useState } from "react";
import "./TripDetails.css";

const url = import.meta.env.VITE_BACKEND_URL;

function TripDetails({ tripId, isOpen, onClose }) {
  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    const getTripDetails = async () => {
      try {
        const response = await fetch(`${url}/getTrip/${tripId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTripDetails(data);
        } else {
          console.error("Failed to fetch trip details");
        }
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };

    getTripDetails();
  }, [tripId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.className === "trip-popup-overlay") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const fomattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    console.log(day, month, year);

    return `${day}-${month}-${year}`;
  };
  return (
    <div className="trip-popup-overlay">
      <div className="trip-popup-container">
        <h2>Trip Details</h2>
        <p>Trip Location: {tripDetails?.tripLocation}</p>
        <p>Trip Start Date: {fomattedDate(tripDetails?.tripStartDate)}</p>
        <p>Trip End Date: {tripDetails?.tripCompletedDate}</p>
        <p>Trip Budget: {tripDetails?.actualBudget}</p>
      </div>
    </div>
  );
}

export default TripDetails;
