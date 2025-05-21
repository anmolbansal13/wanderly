import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./SearchForm.css";

const url = import.meta.env.VITE_BACKEND_URL;
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  };
  return (
    <form
      className="search-form"
      onSubmit={(e) => e.preventDefault()}
      ref={formRef}
    >
      <h4 id="from">From</h4>
      <input
        type="text"
        name="searchbar0"
        id="currentCity"
        placeholder="Current Location"
        value={searchInput0}
        onChange={(e) => {
          setSearchInput0(e.target.value);
          setActiveDropdown("from");
        }}
        onFocus={() => setActiveDropdown("from")}
      />
      <h4 id="to">To</h4>
      <input
        type="text"
        name="searchbar"
        id="destinationCity"
        placeholder="Search for Destination..."
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setActiveDropdown("to");
        }}
        onFocus={() => setActiveDropdown("to")}
      />
      {predictions.length > 0 &&
        activeDropdown === "to" &&
        createPortal(
          <ul
            className="predictions-list"
            style={{
              top:
                document
                  .getElementById("destinationCity")
                  ?.getBoundingClientRect().bottom + "px",
              left:
                document
                  .getElementById("destinationCity")
                  ?.getBoundingClientRect().left + "px",
            }}
          >
            {predictions.map((prediction) => (
              <li
                key={prediction.place_id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handlePredictionSelection(prediction);
                  setActiveDropdown(null);
                }}
              >
                {prediction.description}
              </li>
            ))}
          </ul>,
          document.body
        )}
      {predictions0.length > 0 &&
        activeDropdown === "from" &&
        createPortal(
          <ul
            className="predictions-list"
            style={{
              top:
                document.getElementById("currentCity")?.getBoundingClientRect()
                  .bottom + "px",
              left:
                document.getElementById("currentCity")?.getBoundingClientRect()
                  .left + "px",
            }}
          >
            {predictions0.map((prediction) => (
              <li
                key={prediction.place_id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handlePredictionSelection0(prediction);
                  setActiveDropdown(null);
                }}
              >
                {prediction.description}
              </li>
            ))}
          </ul>,
          document.body
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
