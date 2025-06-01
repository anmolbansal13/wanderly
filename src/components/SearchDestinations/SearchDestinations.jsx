import React, { useState } from "react";
import Gallery from "./Carousel/Gallery.jsx";
import SearchForm from "./SearchForm/SearchForm.jsx";

export default function SearchDestinations({ isLoggedIn, setLoginPopup, selectedCity, setSelectedCity }) {
  // "ChIJP9A_FgiHBDkRzXZQvg6oKYE"
  const [fromCity, setFromCity] = useState(null);
  const [cityName, setCityName] = useState();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  return (
    <div className="p-2 flex flex-col max-w-full bg-black min-h-[90vh] box-border">
      {!selectedCity ? (
        <div className="w-full flex flex-col items-center justify-center p-10 gap-4 rounded-2xl">
          <span className="text-gray-300 text-xl tracking-[3px] uppercase animate-fade-slide-down">
            Welcome to Wanderly
          </span>
          <h2 className="text-2xl text-gray-200 font-medium animate-fade-slide-down-delay-200">
            Your Journey Begins Here
          </h2>
          <h1 className="text-white font-bold text-center my-2 overflow-hidden border-r-[3px] border-indigo-400 whitespace-nowrap mx-auto animate-typewriter text-[clamp(1.2rem,4vw,3rem)]">
            Discover Your Next Adventure
          </h1>
          <p className="text-gray-400 text-xl animate-fade-slide-down-delay-600">
            Select a destination to explore amazing places
          </p>
        </div>
      ) : (
        <></>
      )}
      <SearchForm
        onCitySelect={setSelectedCity}
        setFromCity={setFromCity}
        setCityName={setCityName}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      {selectedCity ? (
        <div className="w-full mr-auto bg-black border border-gray-700 rounded-2xl p-5 shadow-2xl shadow-black/20">
          <Gallery 
            selectedCity={selectedCity}
            isLoggedIn={isLoggedIn}
            setLoginPopup={setLoginPopup}
            cityName={cityName}
            fromCity={fromCity}
            selectedDate={selectedDate}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
