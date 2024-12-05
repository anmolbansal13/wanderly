import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "./Profile.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const url = import.meta.env.VITE_BACKEND_URL;

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    newPassword: "",
    oldPassword: "",
  });

  const [trips, setTrips] = useState({
    saved: [],
    completed: [],
  });
  const [showSavedTrips, setShowSavedTrips] = useState(false);
  const [showCompletedTrips, setShowCompletedTrips] = useState(false);

  // Replace the existing chartData with this configuration
  const chartData = {
    labels: trips.completed.map((trip) => `${trip.destination}`),
    datasets: [
      {
        label: "Trip Expenditure",
        data: trips.completed.map((trip) => trip.actualCost),
        backgroundColor: "#4CAF50",
        borderColor: "#45a049",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Actual Cost (₹)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Destination",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Completed Trips Expenditure",
      },
    },
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // const updatedUser = { ...user };
    try {
      const res = await fetch(`${url}/updateProfile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.status === 200) {
        alert("Profile updated successfully 😎");
        return;
      }
      alert(`Error updating profile: ${data.message}`);
      console.log(data);
    } catch (error) {
      alert(`Error updating profile: ${error.message}`);
      console.log(error);
    }
  };

  useState(async () => {
    const res = await fetch(`${url}/getTrips`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    const transformedTrips = {
      saved: data.saved.map((trip) => ({
        id: trip._id,
        destination: trip.tripLocation,
        date: new Date(trip.tripStartDate).toISOString().split("T")[0],
        estimatedCost: trip.tripBudget,
      })),
      completed: data.completed.map((trip) => ({
        id: trip._id,
        destination: trip.tripLocation,
        date: new Date(trip.tripStartDate).toISOString().split("T")[0],
        actualCost: trip.tripBudget,
      })),
    };
    setTrips(transformedTrips);
  }, []);

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="profile-stats">
          <div className="stat-box">
            <h3>Saved Trips</h3>
            <p>{trips.saved.length}</p>
          </div>
          <div className="stat-box">
            <h3>Completed Trips</h3>
            <p>{trips.completed.length}</p>
          </div>
          <div className="stat-box">
            <h3>Total Spent</h3>
            <p>
              ₹{trips.completed.reduce((sum, trip) => sum + trip.actualCost, 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="trips-section">
          <div className="saved-trips-header">
            <h2>Saved Trips</h2>
            <button
              className="dropdown-toggle"
              onClick={() => {
                setShowSavedTrips(!showSavedTrips);
                setShowCompletedTrips(false);
              }}
            >
              {showSavedTrips ? "▼" : "▶"}
            </button>
          </div>
          {showSavedTrips && (
            <div className="saved-trips">
              {trips.saved.length > 0 ? (
                trips.saved
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .slice(0, 5)
                  .map((trip) => (
                    <div key={trip.id} className="trip-card">
                      <h3>{trip.destination}</h3>
                      <p>Date: {trip.date}</p>
                      <p>Estimated Cost: ₹{trip.estimatedCost}</p>
                      <button className="trip-action-btn">Start Trip</button>
                      <button className="trip-action-btn trip-remove-btn">Cancel Plan</button>
                    </div>
                  ))
              ) : (
                <p>You have no saved trips</p>
              )}
            </div>
          )}

          <div className="completed-trips-header">
            <h2>Completed Trips</h2>
            <button
              className="dropdown-toggle"
              onClick={() => {
                setShowCompletedTrips(!showCompletedTrips);
                setShowSavedTrips(false);
              }}
            >
              {showCompletedTrips ? "▼" : "▶"}
            </button>
          </div>
          {showCompletedTrips && (
            <div className="completed-trips">
              {trips.completed.length > 0 ? (
                trips.completed
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 5)
                  .map((trip) => (
                    <div key={trip.id} className="trip-card">
                      <h3>{trip.destination}</h3>
                      <p>Date: {trip.date}</p>
                      <p>Actual Cost: ₹{trip.actualCost}</p>
                      <button className="trip-action-btn">View Details</button>
                    </div>
                  ))
              ) : (
                <p>You have no completed trips</p>
              )}
            </div>
          )}
        </div>

        <div className="expenditure-graph">
          <h2>Expenditure Overview</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="credentials-section">
          <h2>Change Credentials</h2>
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your Email"
              />
            </div>
            <div className="form-group">
              <label>Old Password:</label>
              <input
                type="password"
                value={user.oldPassword}
                onChange={(e) =>
                  setUser({ ...user, oldPassword: e.target.value })
                }
                placeholder="Enter your current password"
              />
            </div>
            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                value={user.newPassword}
                onChange={(e) =>
                  setUser({ ...user, newPassword: e.target.value })
                }
                placeholder="Enter new password"
              />
            </div>
            <button type="submit" id="update-profile-btn">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
