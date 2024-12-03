import React, { useState, useEffect } from "react";
import "./OffTrip.css";
import { useParams, Navigate } from "react-router-dom";

const url = "http://localhost:3000";
export default function OffTrip() {
  const { cityName } = useParams();

  const [attractions, setAttractions] = useState([]);
  const [activities, setActivities] = useState([]);

  const [date, setDate] = useState(new Date());
  const [budget, setBudget] = useState(0);

  // Fetch attractions from your API
  useEffect(() => {
    // if (cityName!==null && cityName!="null") {
    if (cityName) {
      fetchAttractions();
    }
  }, [cityName]);

  const fetchAttractions = async () => {
    try {
      const response = await fetch(
        `${url}/attractions?city=${encodeURIComponent(cityName)}`
      );
      const data = await response.json();
      setAttractions(data); //API returns array of objects with name and imageUrl
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  // Modified function to handle attraction objects
  const addAttractionToPlan = (attraction) => {
    setActivities([...activities, attraction]);
    setAttractions(attractions.filter((item) => item.id !== attraction.id));
  };

  const removeActivityFromPlan = (activity) => {
    setAttractions([...attractions, activity]);
    setActivities(activities.filter((item) => item.id !== activity.id));
  };

  const handleSaveTrip = async () => {
    try {
      const response = await fetch(`${url}/saveTrip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          tripLocation: cityName,
          tripStartDate: date,
          tripBudget: budget,
          tripAttractions: activities.map((activity) => ({
            name: activity.name,
            photoUrl: activity.photoUrl,
          })),
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Trip saved successfully:", data);
    } catch (error) {
      console.error("Error saving trip:", error);
      alert("Failed to save trip. Please try again.");
    }
  };

  const handleStartTrip = async () => {
    try {
      const response = await fetch(`${url}/startTrip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          tripLocation: cityName,
          tripBudget: budget,
          tripAttractions: activities.map((activity) => ({
            name: activity.name,
            photoUrl: activity.photoUrl,
          })),
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Trip saved successfully:", data);
    } catch (error) {
      console.error("Error saving trip:", error);
      alert("Failed to save trip. Please try again.");
    }
  };

  return (
    <div className="trip-planner">
      <div className="main-content">
        {/* <section className="plan-manager"> */}
          <div className="attractions">
          <h2>Attractions and Activities in {cityName}</h2>
            {attractions.map((attraction) => (
              <div className="attraction-card" key={attraction.id}>
                <img
                  src={url + attraction.photoUrl}
                  alt={attraction.name}
                  className="attraction-image"
                />
                <div className="attraction-details">
                  <span className="attraction-name">{attraction.name}</span>
                  <button
                    className="add-button"
                    onClick={() => addAttractionToPlan(attraction)}
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="activities">
          <h2>Plan Manager</h2>
            {activities.map((activity) => (
              <div className="activity" key={activity.id}>
                <img
                  src={url + activity.photoUrl}
                  alt={activity.name}
                  className="activity-image"
                />
                <span>{activity.name}</span>
                <button onClick={() => removeActivityFromPlan(activity)}>
                  X
                </button>
              </div>
            ))}
          </div>
        {/* </section> */}
      </div>
      <aside className="details">
        <div className="detail-box">
          Your Estimated Budget
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your budget"
            className="estimated-budget"
          />
        </div>
        <div className="calender">
          Start Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            defaultValue={new Date().toISOString().split("T")[0]}
            min={new Date().toISOString().split("T")[0]}
            className="start-date"
          />
        </div>
        <div className="save-trip" onClick={handleSaveTrip}>
          Save Trip
        </div>
        <div className="start-trip" onClick={handleStartTrip}>
          Start Trip
        </div>
      </aside>
    </div>
  );
}
