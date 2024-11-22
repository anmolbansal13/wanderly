import React from 'react'
import './Card.css'

export default function Card({ destination }) {
  return (
    <div className="destination-card">
      <div className="card-image">
        <img src={destination.image} alt={destination.name} />
        <span className="distance">{destination.distance}</span>
      </div>
      <div className="card-content">
        <div className="flex justify-between items-center">
          <h3 className="card-title">{destination.name}</h3>
          <div className="rating">
            <i className="fas fa-star text-yellow-400"></i>
            <span>{destination.rating}</span>
          </div>
        </div>
        <p className="card-description">{destination.description}</p>
      </div>
    </div>
  )
}