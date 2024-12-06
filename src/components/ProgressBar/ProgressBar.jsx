import React, { useState, useEffect } from "react";
import "./ProgressBar.css";
const url = import.meta.env.VITE_BACKEND_URL;

const ProgressBar = ({ tripId, completedActivities, activities }) => {
  const [progress, setProgress] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const [completedCnt, setCompletedCnt] = useState(0);

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
      const total =
        data.tripAttractions.length + data.completedActivities.length;
      const completed = data.completedActivities.length;

      setTotalCnt(total);
      setCompletedCnt(completed);
      setProgress(Math.round((completed / total) * 100));
    } catch (error) {
      console.error("Error fetching trip details:", error);
    }
  };
  useEffect(() => {
    fetchTripDetails();
  }, [completedActivities, activities]);
  return (
    <div className="progressBar">
      <h3>Trip Progress</h3>
      <div className="progressBarDetails">
        <div className="progressDetails">
          {completedCnt} / {totalCnt} Activities Completed
        </div>
        <div className="progressContainer">
          <div className="progressFill" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
