import React, { useState, useEffect } from "react";
import "./SearchForm.css";

export default function SearchForm() {
  const [searchInput, setSearchInput] = useState("");
  const [predictions, setPredictions] = useState([]);

  // Load Google Maps script dynamically
  useEffect(() => {
    const autocomplete = new window.google.maps.places.AutocompleteService();

    if (searchInput) {
      autocomplete.getPlacePredictions(
        {
          input: searchInput,
          types: ["(cities)"],
        },
        (results, status) => {
          if (status === "OK") {
            setPredictions(results);
          }
        }
      );
    } else {
      setPredictions([]);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelect = (prediction) => {
    setSearchInput(prediction.description);
    setPredictions([]);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h4>From</h4>
      <label className="currentCity">Chandigarh</label>
      <button type="button" className="filters">
        Filters
      </button>
      <div className="search-container">
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
        <button type="submit" className="searchBtn">
          Search
        </button>
      </div>
    </form>
  );
}
