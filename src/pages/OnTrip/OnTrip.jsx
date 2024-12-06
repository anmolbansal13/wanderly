import React, { useState } from "react";
import PlanManager from "../../components/PlanManager/PlanManager.jsx";
import Map from "../../components/Map/Map.jsx";
import WeatherWidget from "../../components/WeatherWidget/WeatherWidget.jsx";
import BudgetTracker from "../../components/BudgetTracker/BudgetTracker.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import "./OnTrip.css";
import { useParams, useNavigate } from "react-router-dom";

const OnTrip = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [completedActivities, setCompletedActivities] = useState([]);
  const [activities, setActivities] = useState([]);

  const handleEndTrip = () => {
    if (window.confirm("Are you sure you want to end this trip?")) {
      // Add API call to update trip status
      navigate("/profile"); // Navigate to dashboard after ending trip
    }
  };

  return (
    <div className="gridContainer">
      <div className="planSection">
        <PlanManager
          tripId={tripId}
          completedActivities={completedActivities}
          setCompletedActivities={setCompletedActivities}
          activities={activities}
          setActivities={setActivities}
        />
      </div>

      <div className="mapSection">
        <Map tripId={tripId} />
      </div>

      <div className="weatherSection">
        <WeatherWidget tripId={tripId} />
      </div>

      <div className="expenseSection">
        <BudgetTracker tripId={tripId} />
      </div>

      <div className="progressSection">
        <ProgressBar
          tripId={tripId}
          completedActivities={completedActivities}
          activities={activities}
        />
      </div>
      <button className="endTripButton" onClick={handleEndTrip}>
        End Trip
      </button>
    </div>
  );
};

export default OnTrip;
