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

  const getBackgroundGradient = (isDay, condition) => {
    if (!isDay) {
      return "linear-gradient(91deg, #1a237e, #000051)"; // Night theme
    }

    // Weather condition based backgrounds
    const weatherBackgrounds = {
      Clear: "linear-gradient(91deg, #4FC3F7, #2196F3)",
      Sunny: "linear-gradient(91deg, #FFB74D, #FF9800)",
      Cloudy: "linear-gradient(91deg, #90A4AE, #607D8B)",
      Rain: "linear-gradient(91deg, #78909C, #455A64)",
      Snow: "linear-gradient(91deg, #E0E0E0, #BDBDBD)",
      Storm: "linear-gradient(91deg, #455A64, #263238)",
    };

    const conditionText = condition.toLowerCase();

    if (conditionText.includes("rain")) return weatherBackgrounds.Rain;
    if (conditionText.includes("snow")) return weatherBackgrounds.Snow;
    if (conditionText.includes("cloud")) return weatherBackgrounds.Cloudy;
    if (conditionText.includes("clear")) return weatherBackgrounds.Clear;
    if (conditionText.includes("sunny")) return weatherBackgrounds.Sunny;
    if (conditionText.includes("storm") || conditionText.includes("thunder"))
      return weatherBackgrounds.Storm;

    return weatherBackgrounds.Clear; // default
  };

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
        console.log("Weather data received:", data);
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
    <div
      className="weatherWidget"
      style={{
        background: getBackgroundGradient(
          weatherData.current.is_day,
          weatherData.current.condition.text
        ),
      }}
    >
      {weatherData && (
        <>
          <div className="weatherHeader">
            <h2 className="text-4xl">{weatherData.location.name}</h2>
            <p className="text-md mt-1">
              {weatherData.location.region}, {weatherData.location.country}
            </p>
          </div>

          <div className="condition-section height-1/2">
            <img
              src={weatherData.current.condition.icon.replace("//", "https://")}
              alt={weatherData.current.condition.text}
            />
          </div>
          <div className="temperature-section">
            <div className="temperature-section">
              <h1 className="text-5xl">{weatherData.current.temp_c}°C</h1>
              <p className="feels-like text-lg">
                Feels like: {weatherData.current.feelslike_c}°C
              </p>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span className="label">
                  Wind:
                  <FontAwesomeIcon
                    icon={faWind}
                    className="weather-icon"
                  />{" "}
                </span>
                <span>
                  {weatherData.current.wind_kph} km/h{" "}
                  {weatherData.current.wind_dir}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">
                  Humidity:
                  <FontAwesomeIcon
                    icon={faDroplet}
                    className="weather-icon"
                  />{" "}
                </span>
                <span>{weatherData.current.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="label">
                  Precipitation:
                  <FontAwesomeIcon
                    icon={faCloudRain}
                    className="weather-icon"
                  />{" "}
                </span>
                <span>{weatherData.current.precip_mm} mm</span>
              </div>
              <div className="detail-item">
                <span className="label">
                  Visibility:{" "}
                  <FontAwesomeIcon icon={faEye} className="weather-icon" />{" "}
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
