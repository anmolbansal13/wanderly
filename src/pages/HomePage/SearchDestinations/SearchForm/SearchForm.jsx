import React, { useState, useEffect } from "react";
import "./SearchForm.css";

const url = "http://localhost:3000";
export default function SearchForm({ onCitySelect }) {
  const [searchInput, setSearchInput] = useState("");
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (searchInput) {
        try {
          const response = await fetch(
            `${url}/autocompleteSearch?input=${encodeURIComponent(searchInput)}`
          );
          const data = await response.json();

          if (response.ok) {
            setPredictions(data.predictions);
          }
        } catch (error) {
          console.error("Error fetching predictions:", error);
          setPredictions([]);
        }
      } else {
        setPredictions([]);
      }
    };

    // Add debounce to avoid too many API calls
    const timeoutId = setTimeout(() => {
      fetchPredictions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelect = (prediction) => {
    setSearchInput(prediction.description);
    setPredictions([]);
    onCitySelect(prediction.place_id);
  };

  const handleClick = (prediction) => {
    setSearchInput(prediction.description);
    setPredictions([]);
    onCitySelect(prediction.place_id);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h4>From</h4>
      <label className="currentCity">Chandigarh</label>
      <button type="button" className="filters">
        Filters
      </button>
      <input
        type="text"
        name="searchbar"
        id="searchbar"
        placeholder="Search for Destination..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {predictions.length > 0 && (
        <ul className="predictions-list">
          {predictions.map((prediction) => (
            <li
              key={prediction.place_id}
              onClick={() => handleSelect(prediction)}
            >
              {prediction.description}
            </li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        className="searchBtn"
        onClick={() => handleClick(predictions[0])}
      >
        Search
      </button>
    </form>
  );
}
