import React, { useEffect, useState } from "react";
import PlanManager from "../../components/PlanManager/PlanManager.jsx";
import Map from "../../components/Map/Map.jsx";
import WeatherWidget from "../../components/WeatherWidget/WeatherWidget.jsx";
import BudgetTracker from "../../components/BudgetTracker/BudgetTracker.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import "./OnTrip.css";
import { useParams, useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;
const OnTrip = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [completedActivities, setCompletedActivities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [tripEnded, setTripEnded] = useState(false);

  const handleEndTrip = async () => {
    if (window.confirm("Are you sure you want to end this trip?")) {
      // Add API call to update trip status
      try {
        const response = await fetch(`${url}/endTrip/${tripId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          console.log("Trip status updated successfully");
        } else {
          console.error("Failed to update trip status");
        }
        navigate("/profile"); // Navigate to dashboard after ending trip
      } catch (error) {
        console.error("Error updating trip status:", error);
      }
    }
  };
  useEffect(() => {
    const fetchTripstatus = async () => {
      try {
        const response = await fetch(`${url}/getTrip/${tripId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTripEnded(data.tripComplete);
          // console.log(data);
        } else {
          console.error("Failed to fetch trip status");
        }
      } catch (error) {
        console.error("Error fetching trip status:", error);
      }
    };
    fetchTripstatus();
  }, [tripId]);

  return (
    <>
      {tripEnded ? (
        <div className="isTripEnded">You have ended this trip</div>
      ) : (
        <div className="gridContainer font-serif">
          <>
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
              <Map activities={activities} />
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
          </>
        </div>
      )}
    </>
  );
};

export default OnTrip;
