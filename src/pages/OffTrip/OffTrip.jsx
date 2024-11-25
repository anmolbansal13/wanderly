import React, { useState } from "react";
import "./OffTrip.css";

export default function OffTrip() {
  // State variables for attractions and activities
  const [attractions, setAttractions] = useState([
    "River Rafting",
    "Ziplining",
    "Hot Air Balloon Ride",
    "Yak Ride",
    "Yak Ride",
    "Yak Ride",
    "Paragliding",
  ]);

  const [activities, setActivities] = useState([
    "Hidimba Devi Temple",
    "Skiing",
    "Hampta Pass Trek",
    "Ropeway Ride",
  ]);

  // Function to handle adding an attraction to the plan
  const addAttractionToPlan = (attraction) => {
    setActivities([...activities, attraction]); // Add the attraction to the activities list
    setAttractions(attractions.filter((item) => item !== attraction)); // Remove it from the attractions list
  };
  const removeActivityFromPlan = (activity) => {
    setAttractions([...attractions, activity]); // Add back to attractions
    setActivities(activities.filter(item => item !== activity)); // Remove from activities
  };
  
  return (
    <div className="trip-planner">
      <main className="main-content">
        <section className="plan-manager">
          <h2>Attractions and Activities in Manali</h2>
          <div className="attractions">
            {attractions.map((attraction, index) => (
              <div className="attraction" key={index}>
                <span>{attraction}</span>
                <button onClick={() => addAttractionToPlan(attraction)}>Add</button>
              </div>
            ))}
          </div>
          <h2>Plan Manager</h2>
          <div className="activities">
            {activities.map((activity, index) => (
              <div className="activity" key={index}>
                {activity}
                <button onClick={() => removeActivityFromPlan(activity)}>X</button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <aside className="details">
        <div className="detail-box">Our Estimated Budget - Rs. 8000</div>
        <div className="detail-box">Our Estimated Time - 3 Days</div>
        {/* <div className="detail-box">Your Journey</div> */}
        <div className="start-trip">Start a Trip</div>
      </aside>
    </div>
  );
}
