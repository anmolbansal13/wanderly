import React from "react";
import PlanManager from "../../components/PlanManager/PlanManager";
import "./OnTrip.css";
import { useParams } from "react-router-dom";

const OnTrip = () => {
  const { tripId } = useParams();
  return (
    <div className="onTripContainer">
      <h1 className="pageTitle">Your Trip Plan</h1>
      <h2>{tripId}</h2>
      <div className="sectionContainer">
        <PlanManager tripId={tripId} />
        {/* Additional sections will go here */}
      </div>
    </div>
  );
};

export default OnTrip;
