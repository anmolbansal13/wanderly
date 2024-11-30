import React, { useState, useEffect } from "react";
import "./SearchForm.css";

const url = "http://localhost:3000";
export default function SearchForm({ onCitySelect, setCityName }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchOutput, setSearchOutput] = useState("");
  const [predictions, setPredictions] = useState([]);
   
  useEffect(() => {
    const fetchPredictions = async () => {
      if (searchInput && searchInput !== searchOutput) {
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

    const timeoutId = setTimeout(() => {
      fetchPredictions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput, searchOutput]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSearchOutput(searchInput);
  //   onCitySelect(searchInput);
  // };

  const handlePredictionSelection = (prediction) => {
    setSearchOutput(prediction.description);
    setSearchInput(prediction.description);
    setCityName(prediction.description);
    onCitySelect(prediction.place_id);
  };

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
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
              onClick={() => handlePredictionSelection(prediction)}
            >
              {prediction.description}
            </li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        className="searchBtn"
        onClick={() => predictions.length > 0 && handlePredictionSelection(predictions[0])}
      >
        Search
      </button>
    </form>
  );
}