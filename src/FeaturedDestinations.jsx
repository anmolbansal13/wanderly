import React from 'react'
import Card from './Card'

export default function FeaturedDestinations() {
  return (
    <div className="featured-container">
        <h2>Featured Destinations near you</h2>
        <div className="cards-list">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
    </div>
  )
}
