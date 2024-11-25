import React from 'react'
import './SearchForm.css';
export default function SearchForm() {
  return (
    <form className="search-form">
        <h4>From</h4>
        <label className="currentCity">Chandigarh</label>
        <button type="button" className="filters">Filters</button>
        <input type="text" name="searchbar" id="searchbar" placeholder='Search for Destination...'/>
        <button type="submit" className="searchBtn">Search</button>
    </form>
  )
}
