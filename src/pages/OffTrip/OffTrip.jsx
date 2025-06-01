import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;
export default function OffTrip() {
  const navigate = useNavigate();
  const { cityName } = useParams();

  const [attractions, setAttractions] = useState([]);
  const [activities, setActivities] = useState([]);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [budget, setBudget] = useState();
  const [visibleAttractions, setVisibleAttractions] = useState([]);

  // Fetch attractions from your API
  useEffect(() => {
    // if (cityName!==null && cityName!="null") {
    if (cityName) {
      fetchAttractions();
    }
  }, [cityName]);

  const fetchAttractions = async () => {
    try {
      const response = await fetch(
        `${url}/attractions?city=${encodeURIComponent(cityName)}`
      );
      const data = await response.json();
      setAttractions(data);
      setVisibleAttractions(data.slice(0, 4)); // Show first 4 items
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  // Modified function to handle attraction objects
  const addAttractionToPlan = (attraction) => {
    setActivities([...activities, attraction]);
    const newAttractions = attractions.filter(
      (item) => item.id !== attraction.id
    );
    setAttractions(newAttractions);

    // Update visible attractions
    const currentVisible = visibleAttractions.filter(
      (item) => item.id !== attraction.id
    );
    const nextItem = newAttractions.find(
      (item) => !visibleAttractions.includes(item)
    );
    if (nextItem) {
      currentVisible.push(nextItem);
    }
    setVisibleAttractions(currentVisible);
  };

  const removeActivityFromPlan = (activity) => {
    setActivities(activities.filter((item) => item.id !== activity.id));
    const updatedAttractions = [...attractions, activity];
    setAttractions(updatedAttractions);

    // Add the removed item back to visible attractions if there's space
    if (visibleAttractions.length < 4) {
      setVisibleAttractions([...visibleAttractions, activity]);
    }
  };

  const handleSaveTrip = async () => {
    try {
      const response = await fetch(`${url}/saveTrip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          tripLocation: cityName,
          tripStartDate: date,
          estimatedBudget: budget || 0,
          tripBudget: [],
          tripAttractions: activities.map((activity) => ({
            name: activity.name,
            photoUrl: activity.photoUrl,
            formatted_address: activity.formatted_address,
          })),
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      alert("Trip saved successfully!");
      // console.log("Trip saved successfully:", data);
    } catch (error) {
      console.error("Error saving trip:", error);
      alert("Failed to save trip. Please try again.");
    }
  };

  const handleStartTrip = async () => {
    try {
      const response = await fetch(`${url}/startTrip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          tripLocation: cityName,
          tripBudget: [],
          tripAttractions: activities.map((activity) => ({
            name: activity.name,
            photoUrl: activity.photoUrl,
            formatted_address: activity.formatted_address,
          })),
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const tripId = data._id;
      navigate(`/ontrip/${encodeURIComponent(tripId)}`);

      console.log("Trip started successfully:", data);
    } catch (error) {
      console.error("Error saving trip:", error);
      alert("Failed to save trip. Please try again.");
    }
  };

  return (
    <div className="font-sans bg-black flex h-full justify-center p-2">
      <div className="flex flex-col items-start flex-1 max-w-[70%] min-h-[90vh] bg-black my-2 mx-0 p-5 rounded-lg h-auto shadow-lg">
        <h2 className="text-white text-2xl font-bold my-4">
          Attractions and Activities in {cityName}
        </h2>
        <div className="flex items-center justify-start flex-wrap rounded-lg gap-2">
          {visibleAttractions.map((attraction) => (
            <div
              className="flex flex-col border border-white rounded-lg overflow-hidden m-2 w-48 bg-white shadow-md"
              key={attraction.id}
            >
              <img
                src={url + attraction.photoUrl}
                alt={attraction.name}
                className="w-[500px] h-[200px] object-cover"
                loading="lazy"
              />
              <div className="p-2 flex justify-between items-center">
                <span className="font-medium text-black truncate">
                  {attraction.name}
                </span>
              </div>
              <button
                className="px-4 py-1 rounded border-none bg-green-600 text-white cursor-pointer transition-colors duration-200 hover:bg-green-700"
                onClick={() => addAttractionToPlan(attraction)}
              >
                Add
              </button>
            </div>
          ))}
        </div>
        <h2 className="text-white text-2xl font-bold my-4">Plan Manager</h2>
        <div className="flex items-center justify-center gap-2 flex-wrap max-w-[85%]"> {/*flex-wrap*/}
          {activities.map((activity) => (
            <div
              className="min-w-[250px] w-[45%] bg-white text-black rounded-lg text-center font-bold flex items-center gap-2 p-2 border border-white my-1 mx-2 justify-between"
              key={activity.id}
            >
              <img
                src={url + activity.photoUrl}
                alt={activity.name}
                className="w-12 h-12 object-cover rounded border-[1px] border-black"
              />
              <span className="text-black truncate">{activity.name}</span>
              <button
                className="px-4 py-1 rounded cursor-pointer border-none bg-black text-white hover:bg-red-700 transition-colors duration-200"
                onClick={() => removeActivityFromPlan(activity)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <aside className="flex-1 flex items-start gap-5 m-2 flex-wrap h-full max-w-[20%] md:flex-col lg:flex-col xl:flex-col 2xl:flex-col">
        <div className="bg-transparent text-white p-5 rounded-xl text-center font-bold flex flex-col items-center justify-center w-full text-lg h-32 shadow-lg transition-transform duration-200 overflow-hidden hover:-translate-y-1">
          Your Estimated Budget
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your budget"
            className="truncate text-center rounded-full py-2 px-4 my-2 mx-auto w-fit bg-white text-black"
            min="0"
            max="100000000"
          />
        </div>
        <div className="bg-transparent text-white p-5 rounded-xl text-center font-bold flex flex-col items-center justify-center w-full text-lg h-32 shadow-lg transition-transform duration-200 overflow-hidden hover:-translate-y-1">
          Start Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="truncate text-center rounded-full py-2 px-4 my-2 mx-auto w-fit bg-white text-black"
          />
        </div>
        <div
          className="bg-transparent text-white w-36 h-36 border-2 border-white rounded-2xl content-center p-5 mx-auto font-bold transition-all duration-300 shadow-lg cursor-pointer hover:scale-105"
          onClick={handleSaveTrip}
        >
          SAVE TRIP FOR LATER ?
        </div>
        <div
          className="bg-transparent text-white w-36 h-36 border-2 border-white rounded-2xl content-center p-5 mx-auto font-bold transition-all duration-300 shadow-lg cursor-pointer hover:scale-105"
          onClick={handleStartTrip}
        >
          START TRIP NOW !
        </div>
      </aside>

      {/* Mobile responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .font-sans.bg-gray-900 {
            align-items: center;
            flex-direction: column;
          }
          aside {
            display: flex;
            flex-direction: row;
            max-width: 90%;
          }
        }
      `}</style>
    </div>
  );
}
