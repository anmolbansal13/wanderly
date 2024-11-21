import React from 'react'
import Carousel from './Carousel.jsx';

export default function SearchDestinations() {
  return (
    <div className="search-container">
      <form className="search-form">
        <label className="currentCity">Chandigarh</label>
        <button type="button" className="filters">Filters</button>
        <input type="text" name="searchbar" id="searchbar" placeholder='Search for Destination...'/>
        <button type="submit" className="searchBtn">Search</button>
      </form>
      <Carousel/>
      <div className="bookings">
      
      </div>


    </div>
  )
}
