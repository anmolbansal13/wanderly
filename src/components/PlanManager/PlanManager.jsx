import React, { useState, useEffect } from "react";
import "./PlanManager.css";

const url = import.meta.env.VITE_BACKEND_URL;

const PlanManager = ({ tripId }) => {
  const [activities, setActivities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const fetchTripDetails = async () => {
    try {
      const response = await fetch(`${url}/getTrip/${tripId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setActivities(data.tripAttractions);
    } catch (error) {
      console.error("Error fetching trip details:", error);
    }
  };
  useEffect(() => {
    fetchTripDetails();
  }, []);
  // console.log(activities);
  const removeActivity = (id) => {
    setActivities(activities.filter((item) => item._id !== id));
  };

  const handleAddActivity = async () => {};

  return (
    <div className="planManagerContainer">
      <div className="headerControls">
        <button className="editButton" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Save" : "Edit"}
        </button>
        {isEditing && (
          <button className="addButton" onClick={handleAddActivity}>
            + Add Activity
          </button>
        )}
      </div>
      <div className="activities">
        {activities.map((activity) => (
          <div className="activity" key={activity.id}>
            <img
              src={url + activity.photoUrl}
              alt={activity.name}
              className="activityImage"
            />
            <span>{activity.name}</span>
            {isEditing && (
              <button
                className="removeButton"
                onClick={() => removeActivity(activity._id)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanManager;
