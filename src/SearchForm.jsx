// import React from 'react';
import './SearchForm.css';

const SearchForm = () => {
  return (
    <form className="location-search-form">
      <div className="form-group">
        <label htmlFor="from-location" className="form-label">
          From
        </label>
        <input
          type="text"
          id="from-location"
          name="fromLocation"
          className="form-input"
          placeholder="Your location"
          aria-label="Enter your location"
        />
      </div>

      <div className="form-group">
        <label htmlFor="destination" className="form-label">
          To
        </label>
        <input
          type="text"
          id="destination"
          name="destination"
          className="form-input"
          placeholder="Destination"
          aria-label="Enter your destination"
        />
      </div>

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
