import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const url = import.meta.env.VITE_BACKEND_URL;

export default function SearchForm({
  onCitySelect,
  setCityName,
  selectedDate,
  setSelectedDate,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchOutput, setSearchOutput] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowDropdown(false);
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

    const timeoutId = setTimeout(fetchPredictions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchInput, searchOutput]);

  const handlePredictionSelection = (prediction) => {
    setSearchOutput(prediction.description);
    setSearchInput(prediction.description);
    setCityName(prediction.description);
    onCitySelect(prediction.place_id);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    if (predictions.length > 0) {
      handlePredictionSelection(predictions[0]);
    }
  };

  return (
    <form
      className="flex items-center justify-start p-2 gap-2.5 flex-wrap relative z-[99] md:grid md:grid-cols-6 md:gap-2"
      onSubmit={(e) => e.preventDefault()}
      ref={formRef}
    >
      <input
        type="text"
        name="searchbar"
        id="destinationCity"
        placeholder="Search for Destination..."
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        className="flex-1 px-4 py-2 mt-auto border border-gray-600 rounded-full bg-white text-xs font-semibold text-center text-black placeholder-gray-400 transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-5"
      />

      {predictions.length > 0 &&
        showDropdown &&
        createPortal(
          <ul
            className="absolute bg-white border border-gray-600 rounded shadow-lg max-h-48 overflow-y-auto z-[999] mt-1 p-0 list-none w-full max-w-sm"
            style={{
              top:
                document
                  .getElementById("destinationCity")
                  ?.getBoundingClientRect().bottom + "px",
              left:
                document
                  .getElementById("destinationCity")
                  ?.getBoundingClientRect().left +100 + "px",
            }}
          >
            {predictions.map((prediction) => (
              <li
                key={prediction.place_id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handlePredictionSelection(prediction);
                }}
                className="py-1.5 px-2.5 cursor-pointer transition-colors duration-200 hover:bg-white text-black truncate"
              >
                {prediction.description}
              </li>
            ))}
          </ul>,
          document.body
        )}

      <button
        type="submit"
        className="px-4 py-2 mt-auto border border-gray-600 rounded-full bg-white text-xs font-semibold text-center text-black transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-105 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-1"
        onClick={handleSearch}
      >
        Search
      </button>
    </form>
  );
}
