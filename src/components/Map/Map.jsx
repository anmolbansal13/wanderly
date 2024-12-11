import React, { useEffect, useState } from "react";
import "./Map.css";
import waypoint from "../../assets/location-dot-solid.svg";
// const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

const Map = ({ activites }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [polylineData, setPolylineData] = useState(null);

  const fetchPolylineData = async () => {
    try {
      const response = await fetch(`${url}/getRoute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: {
            address: "00186 Rome, Metropolitan City of Rome Capital, Italy",
          },
          destination: {
            address: "Piazza del Popolo, 00187 Roma RM, Italy",
          },
          intermediates: [
            {
              address: "Piazza della Rotonda, 00186 Roma RM, Italy",
            },
            {
              address: "Campo de' Fiori, 00186 Roma RM, Italy",
            },
          ],
          travelMode: "DRIVE",
          routingPreference: "TRAFFIC_AWARE",
        }),
      });
      const data = await response.json();
      console.log(data);
      setPolylineData(data.routes[0].polyline.encodedPolyline);
    } catch (error) {
      console.log("Error fetching polyline:", error);
    }
  };

  useEffect(() => {
    fetchPolylineData();
  }, []);

  useEffect(() => {
    const geocodeAddresses = async (markers) => {
      const geocoder = new google.maps.Geocoder();

      // Use Promise.all to wait for all geocoding requests
      const geocodedMarkers = await Promise.all(
        markers.map((location) => {
          return new Promise((resolve, reject) => {
            geocoder.geocode(
              { address: location.address },
              (results, status) => {
                if (status === "OK") {
                  resolve({
                    position: results[0].geometry.location,
                    title: location.title,
                  });
                } else {
                  reject(`Geocoding failed for ${location.address}`);
                }
              }
            );
          });
        })
      );

      return geocodedMarkers;
    };

    window.initMap = async () => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.423901, lng: -122.083739 },
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      const addMarker = (position, title) => {
        const marker = new google.maps.Marker({
          position,
          map,
          title,
          icon: {
            url: waypoint,
            scaledSize: new google.maps.Size(20, 20), // Makes the icon small (20x20 pixels)
            fillColor: "#FF0000", // Red color
            fillOpacity: 1,
            strokeColor: "#FF0000",
            strokeWeight: 2,
            anchor: new google.maps.Point(10, 10),
            // path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
            // fillOpacity: 1,
            // strokeColor: "#FF0000",
            // strokeWeight: 2,
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: title,
        });

        infoWindow.open(map, marker);

        return marker;
      };

      const markers = [
        {
          address: "00186 Rome, Metropolitan City of Rome Capital, Italy",
          title: "Start",
        },
        {
          address: "Piazza della Rotonda, 00186 Roma RM, Italy",
          title: "Stop 1",
        },
        { address: "Campo de' Fiori, 00186 Roma RM, Italy", title: "Stop 2" },
        { address: "Piazza del Popolo, 00187 Roma RM, Italy", title: "End" },
      ];

      try {
        const geocodedLocations = await geocodeAddresses(markers);

        // Now we can safely add all markers
        geocodedLocations.forEach((location) => {
          addMarker(location.position, location.title);
        });

        // Handle polyline after markers are placed
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

          // Fit map bounds to show the entire route
          const bounds = new google.maps.LatLngBounds();
          polylinePath.forEach((point) => bounds.extend(point));
          map.fitBounds(bounds);

          routePolyline.setMap(map);
        }
      } catch (error) {
        console.log("Error during geocoding:", error);
      }
    };
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_API_KEY
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
  }, [url, activites, polylineData]);

  return (
    <div className="mapContainer">
      <div id="map" />
    </div>
  );
};

export default Map;
