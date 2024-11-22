import React from 'react';
import './Bookings.css';

const Bookings = () => {
  const bookingOptions = [
    { name: 'Flights', icon: '✈️' },
    { name: 'Hotels', icon: '🏨' },
    { name: 'Bus/Cabs', icon: '🚍' },
    { name: 'Start a Trip', icon: '...' },
  ];

  return (
    <div className="bookings-container">
      <h1 className="bookings-title">Bookings</h1>
      <div className="booking-options">
        {bookingOptions.map((option, index) => (
          <div key={index} className="booking-card">
            <div className="booking-icon">{option.icon}</div>
            <h2 className="booking-name">{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
