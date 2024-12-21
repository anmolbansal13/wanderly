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
          // console.log(data);
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
    date = new Date(date);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
  };
  const getBudget = (budgetArray) => {
    if(budgetArray.length===0) return "You did not add anything in your trip budget";
    const budget = budgetArray.reduce((total, expense) => total + expense.cost, 0);
    return budget;
  };
  return (
    <div className="trip-popup-overlay">
      <div className="trip-popup-container">
        <h2>Trip Details</h2>
        <p>Trip Location: {tripDetails?.tripLocation}</p>
        <p>Trip Start Date: {fomattedDate(tripDetails?.tripStartDate)}</p>
        <p>Trip End Date: {fomattedDate(tripDetails?.tripCompletedDate)}</p>
        <p>Trip Budget: {getBudget(tripDetails?.tripBudget)}</p>
      </div>
    </div>
  );
}

export default TripDetails;
