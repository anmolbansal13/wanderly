import React, { useState, useEffect } from "react";
import "./PlanManager.css";

const url = import.meta.env.VITE_BACKEND_URL;

const PlanManager = ({ tripId }) => {
  const [activities, setActivities] = useState([]);
  const [originalActivities, setOriginalActivities] = useState([]);
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
      setOriginalActivities(data.tripAttractions);
    } catch (error) {
      console.error("Error fetching trip details:", error);
    }
  };
  const handleSave = async () => {
    // Add your save logic here
    // Example: API call to update activities
    setIsEditing(false);
  };

  const handleCancel = () => {
    setActivities([...originalActivities]);
    setIsEditing(false);
  };

  useEffect(() => {
    fetchTripDetails();
  }, []);
  // console.log(activities);
  const removeActivity = (id) => {
    setActivities(activities.filter((item) => item._id !== id));
  };

  // const handleAddActivity = async () => {};
  const handleActivityDone = async (id) => {
    // try {
    //   const response = await fetch(`${url}/markActivityAsDone/${id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   console.log(data);
    //   fetchTripDetails();
    // } catch (error) {
    //   console.error("Error marking activity as done :", error);
    // }
  };
  return (
    <div className="planManagerContainer">
      <div className="header">
        <h1 className="planManagerTitle">Your Trip Plan</h1>
        {!isEditing ? (
          <button className="editButton" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        ) : (
          <div className="editButtons">
            <button className="saveButton" onClick={handleSave}>
              Save
            </button>
            <button className="cancelButton" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="activities-ontrip">
        {activities.map((activity) => (
          <div className="activity-ontrip" key={activity._id}>
            {!isEditing && (
              <img
                src={url + activity.photoUrl}
                alt={activity.name}
                className="activityImage-ontrip"
              />
            )}
            <span>{activity.name}</span>
            {isEditing && (
              <div className="activity-ontrip-buttons">
                <button
                  className="removeButton"
                  onClick={() => removeActivity(activity._id)}
                >
                  Remove
                </button>
                <button
                  className="markDoneBtn"
                  onClick={() => {
                    handleActivityDone(activity._id);
                  }}
                >
                  Mark as Done
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanManager;
