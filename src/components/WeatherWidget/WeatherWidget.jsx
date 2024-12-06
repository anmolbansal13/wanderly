import React, { useState, useEffect } from "react";
import "./WeatherWidget.css";

const WeatherWidget = ({ tripId }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Replace with your actual backend API endpoint
        const response = await fetch(`/api/trips/${tripId}/weather`);
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Could not fetch weather data");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [tripId]);

  const getWeatherIcon = (condition) => {
    // Map weather conditions to appropriate icons
    const iconMap = {
      'sunny': '☀️',
      'cloudy': '☁️',
      'rainy': '🌧️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'default': '🌈'
    };
    return iconMap[condition.toLowerCase()] || iconMap['default'];
  };

  if (loading) return <div className="weatherWidget">Loading weather...</div>;
  if (error) return <div className="weatherWidget">{error}</div>;

  return (
    <div className="weatherWidget">
      <h3>Weather Forecast</h3>
      <div className="weatherForecast">
        {weatherData && weatherData.map((day, index) => (
          <div key={index} className="weatherDay">
            <div className="weatherDate">{day.date}</div>
            <div className="weatherIcon">{getWeatherIcon(day.condition)}</div>
            <div className="weatherTemp">
              <span className="tempHigh">{day.highTemp}°C</span>
              <span className="tempLow">{day.lowTemp}°C</span>
            </div>
            <div className="weatherCondition">{day.condition}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;
