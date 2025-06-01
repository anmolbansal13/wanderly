import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;

const Bookings = ({
  isLoggedIn,
  setLoginPopup,
  cityName,
  fromCity,
  selectedDate,
}) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState(null);
  const [isCitySelected, setIsCitySelected] = useState(false);

  useEffect(() => {
    setIsCitySelected(!!cityName);
  }, [cityName]);

  const [lastSearch, setLastSearch] = useState({ cityName: "", fromCity: "" });

  const handleStartTrip = async () => {
    if (isCitySelected && isLoggedIn) {
      await navigate(`/offtrip/${encodeURIComponent(cityName)}`);
    }
    if (isCitySelected && !isLoggedIn) {
      setLoginPopup(`/offtrip/${encodeURIComponent(cityName)}`);
    }
  };

  return (
    <div className="pl-2 text-center font-sans text-white min-w-[15%] my-auto">
      <div className="h-full flex items-center justify-evenly flex-col flex-wrap gap-3 mt-2.5 md:justify-center md:flex-row">
        {/* <div
          className="rounded-lg p-2.5 transition-shadow duration-300 ease-in-out text-center w-full aspect-square flex justify-center items-center flex-col hover:shadow-lg hover:shadow-white/10 hover:cursor-pointer md:max-w-[30%] md:aspect-auto"
          > */}
          <h2 className="text-2xl text-gray-300 hover:shadow-lg hover:shadow-white/10 hover:cursor-pointer"
            disabled={isCitySelected}
            onClick={handleStartTrip}
          >
            {isCitySelected ? "Start Trip" : "Choose Destination"}
          </h2>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Bookings;
