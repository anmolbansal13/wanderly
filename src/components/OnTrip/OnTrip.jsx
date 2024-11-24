import React from "react";
import "./OnTrip.css"; 

const OnTrip = () => {
  const mockActivities = ["Activity 1", "Activity 2", "Activity 3"];
  const tripProgress = 2; 
  const totalActivities = 5;

  return (
    <div className="ontrip-container">
      <div className="main-content">
        <section className="plan-manager">
          <h2 className="section-title">Plan Manager</h2>
          <div className="activity-grid">
            {mockActivities.map((activity, index) => (
              <div key={index} className="activity-card">
                {activity}
              </div>
            ))}
            <div className="activity-card add-activity">
              Add more to plan...
            </div>
          </div>
        </section>

        <aside className="sidebar">
          <div className="widget">
            <h3 className="widget-title">Expense Tracker</h3>
            <p>Total Spent: $250</p>
            <p>Remaining Budget: $750</p>
          </div>

          <div className="widget">
            <h3 className="widget-title">Time Spent on Trip</h3>
            <p>3 days out of 7 days</p>
          </div>

          <div className="widget">
            <h3 className="widget-title">Trip Progress</h3>
            <p>
              {tripProgress}/{totalActivities} activities done
            </p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${(tripProgress / totalActivities) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="widget">
            <h3 className="widget-title">Current Weather</h3>
            <p>Location: New York</p>
            <p>Temperature: 25°C</p>
            <p>Condition: Sunny</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OnTrip;
