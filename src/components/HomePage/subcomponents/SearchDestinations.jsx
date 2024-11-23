import React from 'react'
import Carousel from './Carousel.jsx';
import Bookings from './Bookings.jsx';
// import SearchForm from './SearchForm.jsx';
export default function SearchDestinations() {
  return (
	<div className="searchDestinations">
		<form className="search-form">
			From
			<label className="currentCity">Chandigarh</label>
			<button type="button" className="filters">Filters</button>
			<input type="text" name="searchbar" id="searchbar" placeholder='Search for Destination...'/>
			<button type="submit" className="searchBtn">Search</button>
		</form>
		<div className="search-results">
			{/* <SearchForm/> */}
			<Carousel/>
			<Bookings/>
		</div>
	</div>
  )
}
