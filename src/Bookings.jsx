import React from 'react';
import './Bookings.css';

const Bookings = () => {


  return (
    <div className="bookings-container">
      <h1 className="bookings-title">Bookings</h1>
      <div className="booking-options">
        
        <div className="booking-card">
            <div className="booking-icon">{'✈️'}</div>
            <h2 className="booking-name">{'Flights'}</h2>
        </div>
        <div className="booking-card">
          <div className="booking-icon">{'🏨'}</div>
          <h2 className="booking-name">{'Hotels'}</h2>
        </div>
        <div className="booking-card">
            <div className="booking-icon">{'🚍'}</div>
            <h2 className="booking-name">{'Bus/Cabs'}</h2>
        </div>
        <div className="booking-card">
          <div className="booking-icon">{'...'}</div>
          <h2 className="booking-name">{'Start a Trip'}</h2>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
