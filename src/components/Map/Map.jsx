import React from "react";
import "./Map.css";
// import waypoint from "../../assets/location-dot-solid.svg";

const Map = ({ activities }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [mapData, setMapData] = React.useState({
    routes: [],
    staticMapUrl: '',
    mapImage: '',
    markers: []
  });
  // console.log(activities);
  const locations = [
    {
      position: { lat: 41.9028, lng: 12.4964 },
      title: "Start",
      address: "00186 Rome, Metropolitan City of Rome Capital, Italy",
    },
    {
      position: { lat: 41.8992, lng: 12.4768 },
      title: "Stop 1",
      address: "Piazza della Rotonda, 00186 Roma RM, Italy",
    },
    {
      position: { lat: 41.8955, lng: 12.4721 },
      title: "Stop 2",
      address: "Campo de' Fiori, 00186 Roma RM, Italy",
    },
    {
      position: { lat: 41.9109, lng: 12.4763 },
      title: "End",
      address: "Piazza del Popolo, 00187 Roma RM, Italy",
    },
  ];

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

  React.useEffect(() => {
    fetchMapData();
  }, []);

  return (
    <div className="mapContainer">
      {mapData.mapImage && (
        <div className="map-content">
          <img 
            src={mapData.mapImage} 
            alt="Route Map" 
            className="map-image"
          />
        </div>
      )}
    </div>
  );
};

export default Map;
