import React, { useState, useEffect } from "react";
import "./SearchForm.css";

const url = import.meta.env.VITE_BACKEND_URL;
console.log(url);
export default function SearchForm({
  onCitySelect,
  setCityName,
  setFromCity,
  selectedDate,
  setSelectedDate,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchInput0, setSearchInput0] = useState("");
  const [searchOutput, setSearchOutput] = useState("");
  const [searchOutput0, setSearchOutput0] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [predictions0, setPredictions0] = useState([]);

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

  useEffect(() => {
    const fetchPredictions = async () => {
      if (searchInput0 && searchInput0 !== searchOutput0) {
        try {
          const response = await fetch(
            `${url}/autocompleteSearch?input=${encodeURIComponent(
              searchInput0
            )}`
          );
          const data = await response.json();

          if (response.ok) {
            setPredictions0(data.predictions);
          }
        } catch (error) {
          console.error("Error fetching predictions:", error);
          setPredictions0([]);
        }
      } else {
        setPredictions0([]);
      }
    };
    const timeoutId = setTimeout(() => {
      fetchPredictions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput0, searchOutput0]);

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
  const handlePredictionSelection0 = (prediction) => {
    setSearchOutput0(prediction.description);
    setSearchInput0(prediction.description);
    setFromCity(prediction.description);
    //setCityName(prediction.description);
    //onCitySelect(prediction.place_id);
  };
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h4 id="from">From</h4>
      {/* <label className="currentCity">Chandigarh</label> */}
      <input
        type="text"
        name="searchbar0"
        id="currentCity"
        placeholder="Current Location"
        value={searchInput0}
        onChange={(e) => setSearchInput0(e.target.value)}
      />
      {predictions0.length > 0 && (
        <ul className="predictions-list">
          {predictions0.map((prediction) => (
            <li
              key={prediction.place_id}
              onClick={() => handlePredictionSelection0(prediction)}
            >
              {prediction.description}
            </li>
          ))}
        </ul>
      )}
      {/* <button type="button" className="filters">
        Filters
      </button> */}
      <h4 id="to">To</h4>
      <input
        type="text"
        name="searchbar"
        id="destinationCity"
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
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        min={new Date().toISOString().split("T")[0]}
        id="date"
      />
      <button
        type="submit"
        className="searchBtn"
        onClick={() =>
          predictions.length > 0 && handlePredictionSelection(predictions[0])
        }
      >
        Search
      </button>
    </form>
  );
}
