import React, { useEffect, useState } from "react";
import "./Map.css";

const Map = ({ activities }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [polylineData, setPolylineData] = useState(null);
  const [geocodedLocations, setGeocodedLocations] = useState(null);
  const [center, setCenter] = useState(null);

  const prepareLocations = () => {
    if (!activities || activities.length === 0) return [];

    return activities.map((activity, index) => ({
      address: activity.formatted_address,
      title: activity.name,
    }));
  };

  // Fetch geocoded locations
  const fetchGeocodedLocations = async (markers) => {
    try {
      const response = await fetch(`${url}/geocodeAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markers }),
      });
      const data = await response.json();
      setGeocodedLocations(data);
      setCenter(data[0].position);
    } catch (error) {
      console.log("Error fetching geocoded locations:", error);
    }
  };

  // Fetch polyline data
  const fetchPolylineData = async () => {
    if (!activities || activities.length < 2) return;

    try {
      const response = await fetch(`${url}/getRoute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: {
            address: activities[0].formatted_address,
          },
          destination: {
            address: activities[activities.length - 1].formatted_address,
          },
          intermediates: activities.slice(1, -1).map((activity) => ({
            address: activity.formatted_address,
          })),
          travelMode: "DRIVE",
          routingPreference: "TRAFFIC_AWARE",
        }),
      });
      const data = await response.json();
      setPolylineData(data.routes[0].polyline.encodedPolyline);
    } catch (error) {
      console.log("Error fetching polyline:", error);
    }
  };

  useEffect(() => {
    if (activities && activities.length > 0) {
      const markers = prepareLocations();
      fetchGeocodedLocations(markers);
    }
  }, [activities]);

  // Fetch polyline after geocoding is complete
  useEffect(() => {
    if (geocodedLocations) {
      fetchPolylineData();
    }
  }, [geocodedLocations]);

  useEffect(() => {
    window.initMap = async () => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      });

      const addMarker = (position, title) => {
        const marker = new google.maps.Marker({
          position,
          map,
          title,
        });

        return marker;
      };

      if (geocodedLocations) {
        geocodedLocations.forEach((location) => {
          addMarker(location.position, location.title);
        });

        if (polylineData) {
          const polylinePath =
            google.maps.geometry.encoding.decodePath(polylineData);
          const routePolyline = new google.maps.Polyline({
            path: polylinePath,
            geodesic: true,
            strokeColor: "#4285F4",
            strokeOpacity: 1.0,
            strokeWeight: 4,
          });

          const bounds = new google.maps.LatLngBounds();
          polylinePath.forEach((point) => bounds.extend(point));
          map.fitBounds(bounds);

          routePolyline.setMap(map);
        }
      }
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_PUBLIC_MAPS_GOOGLE_API_KEY
    }&libraries=geometry&callback=initMap`;
    script.async = true;
    script.defer = true;
    if (!document.querySelector(`script[src="${script.src}"]`)) {
      document.head.appendChild(script);
    }

    return () => {
      window.initMap = undefined;
      const existingScript = document.querySelector(
        `script[src="${script.src}"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [geocodedLocations, polylineData]);

  return (
    <div className="mapContainer">
      <div id="map" />
    </div>
  );
};

export default Map;
