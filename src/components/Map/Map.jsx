import React, { useEffect } from "react";
import "./Map.css";
// import waypoint from "../../assets/location-dot-solid.svg";

const Map = ({ activities }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [mapData, setMapData] = React.useState({
    routes: [],
    staticMapUrl: "",
    mapImage: "",
    markers: [],
  });
  const locations = activities.map((activity) => {
    return {
      title: activity.name,
      address: activity.formatted_address,
    };
  });
  // console.log(activities);

  const fetchMapData = async () => {
    const query = new URLSearchParams({
      locations: JSON.stringify(locations),
    }).toString();

    const response = await fetch(`${url}/getMapData?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMapData(data);
  };

  useEffect(() => {
    fetchMapData();
  }, [activities]);

  return (
    <div className="mapContainer overflow-hidden">
      {mapData.mapImage && (
        <div className="map-content">
          <img src={mapData.mapImage} alt="Route Map" className="map-image" />
        </div>
      )}
    </div>
  );
};

export default Map;
