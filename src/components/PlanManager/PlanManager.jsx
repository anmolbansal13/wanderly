import React, { useState, useEffect } from "react";
import "./PlanManager.css";

const url = import.meta.env.VITE_BACKEND_URL;

const PlanManager = ({
  tripId,
  completedActivities,
  setCompletedActivities,
  activities,
  setActivities,
  originalActivities,
  setOriginalActivities,
}) => {
  const [cityName, setCityName] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const fetchTripDetails = async () => {
    try {
      const response = await fetch(`${url}/getTrip/${tripId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 429) {
        alert("Too many requests, please try again later");
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!cityName) {
        setCityName(data.tripLocation);
      }
      setActivities(data.tripAttractions);
      setOriginalActivities(data.tripAttractions);
      setCompletedActivities(data.completedActivities);
    } catch (error) {
      console.error("Error fetching trip details:", error);
    }
  };
  const handleSave = async () => {
    try {
      const response = await fetch(`${url}/editTrip/${tripId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          tripAttractions: activities,
          completedActivities: completedActivities,
        }),
      });
      if (response.status === 429) {
        alert("Too many requests, please try again later");
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);
      fetchTripDetails();
    } catch (error) {
      console.error("Error marking activity as done :", error);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setActivities([...originalActivities]);
    setIsEditing(false);
  };

  useEffect(() => {
    fetchTripDetails();
  }, []);

  const removeActivity = (id) => {
    setActivities(activities.filter((item) => item._id !== id));
  };

  const [showPopup, setShowPopup] = useState(false);
  const [availableAttractions, setAvailableAttractions] = useState([]);

  const handleAddActivity = async () => {
    setShowPopup(true);
    try {
      const response = await fetch(
        `${url}/attractions?city=${encodeURIComponent(cityName)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 429) {
        alert("Too many requests, please try again later");
      }
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      // Filter out attractions that are already in activities or completedActivities
      const filteredAttractions = data.filter(
        (attraction) =>
          !activities.some((act) => act.name === attraction.name) &&
          !completedActivities.some((act) => act.name === attraction.name)
      );
      setAvailableAttractions(filteredAttractions);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  const toggleAttraction = (attraction) => {
    if (activities.includes(attraction)) {
      setActivities(activities.filter((act) => act !== attraction));
    } else {
      setActivities([...activities, attraction]);
    }
  };

  const handleActivityDone = async (id) => {
    setCompletedActivities((prev) => [
      ...prev,
      activities.find((item) => item._id === id),
    ]);
    removeActivity(id);
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
        {isEditing && (
          <div
            className="activity-ontrip add-activity-ontrip"
            onClick={() => handleAddActivity()}
          >
            <h2>+</h2>
            <p>Add More</p>
          </div>
        )}
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
              <div className="activity-ontrip-buttons" key={activity._id}>
                <button
                  className="removeButton"
                  onClick={() => removeActivity(activity._id)}
                  key={activity._id + "remove"}
                >
                  Remove
                </button>
                <button
                  className="markDoneBtn"
                  onClick={() => {
                    handleActivityDone(activity._id);
                  }}
                  key={activity._id + "done"}
                >
                  Mark as Done
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {showPopup && (
        <>
          <div className="popup-overlay" onClick={() => setShowPopup(false)} />
          <div className="popup-container">
            <div className="attractions-grid">
              {availableAttractions.map((attraction) => (
                <div key={attraction.id} className="attraction-item">
                  <span>{attraction.name}</span>
                  <button
                    className={`add-remove-btn ${
                      activities.includes(attraction) ? "remove-btn" : "add-btn"
                    }`}
                    onClick={() => toggleAttraction(attraction)}
                  >
                    {activities.includes(attraction) ? "Remove" : "Add"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlanManager;
