import React from 'react'
import SearchDestinations from './SearchDestinations'
import FeaturedDestinations from './FeaturedDestinations'

export default function Body() {
  return (
    <div className='main-body'>
      <SearchDestinations/>
      <FeaturedDestinations/>
    </div>
  )
}
