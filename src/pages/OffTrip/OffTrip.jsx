import React, { useState, useEffect } from "react";
import "./OffTrip.css";
import { useParams } from "react-router-dom";

const url = "http://localhost:3000";
export default function OffTrip() {
  const { cityName } = useParams();

  const [attractions, setAttractions] = useState([]);
  const [activities, setActivities] = useState([]);

  // Fetch attractions from your API
  useEffect(() => {
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
      setAttractions(data); // Assuming your API returns array of objects with name and imageUrl

      console.log(url + "/" + attractions[0].imageUrl);
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

  return (
    <div className="trip-planner">
      <main className="main-content">
        <section className="plan-manager">
          <h2>Attractions and Activities in {cityName}</h2>
          <div className="attractions">
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
          <h2>Plan Manager</h2>
          <div className="activities">
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
        </section>
      </main>
      <aside className="details">
        <div className="detail-box">Our Estimated Budget - Rs. 8000</div>
        <div className="detail-box">Our Estimated Time - 3 Days</div>
        <div className="start-trip">Start a Trip</div>
      </aside>
    </div>
  );
}
