import React, { useState, useEffect } from "react";
import "./OffTrip.css";
import { useParams, Navigate, useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;
export default function OffTrip() {
  const navigate = useNavigate();
  const { cityName } = useParams();

  const [attractions, setAttractions] = useState([]);
  const [activities, setActivities] = useState([]);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [budget, setBudget] = useState();
  const [visibleAttractions, setVisibleAttractions] = useState([]);

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
      setAttractions(data);
      setVisibleAttractions(data.slice(0, 4)); // Show first 4 items
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  // Modified function to handle attraction objects
  const addAttractionToPlan = (attraction) => {
    setActivities([...activities, attraction]);
    const newAttractions = attractions.filter(
      (item) => item.id !== attraction.id
    );
    setAttractions(newAttractions);

    // Update visible attractions
    const currentVisible = visibleAttractions.filter(
      (item) => item.id !== attraction.id
    );
    const nextItem = newAttractions.find(
      (item) => !visibleAttractions.includes(item)
    );
    if (nextItem) {
      currentVisible.push(nextItem);
    }
    setVisibleAttractions(currentVisible);
  };

  const removeActivityFromPlan = (activity) => {
    setActivities(activities.filter((item) => item.id !== activity.id));
    const updatedAttractions = [...attractions, activity];
    setAttractions(updatedAttractions);

    // Add the removed item back to visible attractions if there's space
    if (visibleAttractions.length < 4) {
      setVisibleAttractions([...visibleAttractions, activity]);
    }
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
          estimatedBudget: (budget || 0),
          tripBudget: [],
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
      alert("Trip saved successfully!");
      // console.log("Trip saved successfully:", data);
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
          tripBudget: [],
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
      const tripId = data._id;
      navigate(`/ontrip/${encodeURIComponent(tripId)}`);

      console.log("Trip started successfully:", data);
    } catch (error) {
      console.error("Error saving trip:", error);
      alert("Failed to save trip. Please try again.");
    }
  };

  return (
    <div className="trip-planner">
      <div className="main-content">
        <h2>Attractions and Activities in {cityName}</h2>
        <div className="attractions">
          {visibleAttractions.map((attraction) => (
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
        <h2>Plan Manager</h2>
        <div className="activities-offtrip">
          {activities.map((activity) => (
            <div className="activity-offtrip" key={activity.id}>
              <img
                src={url + activity.photoUrl}
                alt={activity.name}
                className="activity-image-offtrip"
              />
              <span>{activity.name}</span>
              <button onClick={() => removeActivityFromPlan(activity)}>
                Remove
              </button>
            </div>
          ))}
        </div>
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
            min="0"
            max="100000000"
          />
        </div>
        <div className="calender">
          Start Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="start-date"
          />
        </div>
        <div className="save-trip" onClick={handleSaveTrip}>
          SAVE TRIP
        </div>
        <div className="start-trip" onClick={handleStartTrip}>
          START TRIP
        </div>
      </aside>
    </div>
  );
}
