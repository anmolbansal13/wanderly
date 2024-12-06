import React, { useState, useEffect } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ tripId }) => {
  const [progress, setProgress] = useState(0);
  const [totalActivities, setTotalActivities] = useState(0);
  const [completedActivities, setCompletedActivities] = useState(0);

  useEffect(() => {
    // Simulated data fetching - replace with actual API call
    const fetchTripActivities = async () => {
      try {
        // TODO: Replace with actual API endpoint
        const mockActivities = [
          { id: 1, completed: true },
          { id: 2, completed: false },
          { id: 3, completed: true },
          { id: 4, completed: false },
        ];

        const total = mockActivities.length;
        const completed = mockActivities.filter(activity => activity.completed).length;

        setTotalActivities(total);
        setCompletedActivities(completed);
        setProgress(Math.round((completed / total) * 100));
      } catch (error) {
        console.error("Error fetching trip activities:", error);
      }
    };

    fetchTripActivities();
  }, [tripId]);

  return (
    <div className="progressBar">
      <h3>Trip Progress</h3>
      <div className="progressContainer">
        <div 
          className="progressFill" 
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
      <div className="progressDetails">
        {completedActivities} / {totalActivities} Activities Completed
      </div>
    </div>
  );
};

export default ProgressBar;
