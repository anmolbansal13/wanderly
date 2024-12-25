import React, { useState, useEffect } from "react";
import "./WeatherWidget.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faWind,
  faCloudRain,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const url = import.meta.env.VITE_BACKEND_URL;
const WeatherWidget = ({ tripId }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState();

  useEffect(() => {
    const fetchCityName = async () => {
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
          setCityName(data.tripLocation);
        } else {
          console.error("Failed to fetch trip status");
        }
      } catch (error) {
        console.error("Error fetching trip status:", error);
      }
    };
    fetchCityName();
  }, [tripId]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!cityName) return;

      setLoading(true); // Set loading at the start of fetch
      try {
        const response = await fetch(`${url}/fetchWeather/${cityName}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        // console.log("Weather data received:", data);
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        console.log("Weather fetch error:", err);
        setError("Could not fetch weather data");
      }
    };

    fetchWeatherData();
    // Set loading to false after fetch
  }, [cityName]);

  if (loading) return <div className="weatherWidget">Loading weather...</div>;
  if (error) return <div className="weatherWidget">{error}</div>;

  return (
    <div className="weatherWidget">
      {weatherData && (
        <>
          <div className="weatherHeader">
            <h2 className="location-name">{weatherData.location.name}</h2>
            <p className="location-region">
              {weatherData.location.region}, {weatherData.location.country}
            </p>
          </div>

          {/* <div className="condition-section">
            <img
              src={weatherData.current.condition.icon.replace("//", "https://")}
              alt={weatherData.current.condition.text}
            />
          </div> */}
          <div className="temperature-section">
            <div className="temp-section">
              <h1 className="current-temp">{weatherData.current.temp_c}°C</h1>
              <p className="feels-like">
                Feels like: {weatherData.current.feelslike_c}°C
              </p>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span className="label">
                  Wind:
                  <FontAwesomeIcon icon={faWind} className="weather-icon" />
                </span>
                <span>
                  {weatherData.current.wind_kph} km/h {weatherData.current.wind_dir}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">
                  Humidity:
                  <FontAwesomeIcon icon={faDroplet} className="weather-icon" />
                </span>
                <span>{weatherData.current.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="label">
                  Precipitation:
                  <FontAwesomeIcon icon={faCloudRain} className="weather-icon" />
                </span>
                <span>{weatherData.current.precip_mm} mm</span>
              </div>
              <div className="detail-item">
                <span className="label">
                  Visibility:
                  <FontAwesomeIcon icon={faEye} className="weather-icon" />
                </span>
                <span>{weatherData.current.vis_km} km</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;