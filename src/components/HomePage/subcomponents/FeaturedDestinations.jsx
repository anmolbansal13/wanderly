import React, { useState } from 'react';
import Card from './Card';
import './FeaturedDestinations.css';

const destinations = [
  {
    id: 1,
    name: "Taj Mahal, Agra",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
    rating: 4.8,
    distance: "215 km",
    description: "One of the seven wonders of the world, symbol of eternal love"
  },
  {
    id: 2,
    name: "Jaipur Pink City",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
    rating: 4.6,
    distance: "150 km",
    description: "Royal palaces, vibrant culture and historic architecture"
  },
  {
    id: 3,
    name: "Goa Beaches",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
    rating: 4.7,
    distance: "400 km",
    description: "Pristine beaches, nightlife and Portuguese influence"
  },
  {
    id: 4,
    name: "Varanasi Ghats",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc",
    rating: 4.5,
    distance: "320 km",
    description: "Spiritual capital of India, ancient temples and holy Ganges"
  },
  {
    id: 5,
    name: "Kerala Backwaters",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
    rating: 4.9,
    distance: "890 km",
    description: "Serene waterways, houseboats and lush greenery"
  },
  {
    id: 6,
    name: "Udaipur Lakes",
    image: "https://images.unsplash.com/photo-1590766940554-153a4d9afce0",
    rating: 4.7,
    distance: "250 km",
    description: "City of lakes, royal palaces and romantic settings"
  }
]

export default function FeaturedDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex + 3 >= destinations.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 2 >= destinations.length ? 0 : prevIndex + 2
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 2 < 0 ? destinations.length - 2 : prevIndex - 2
    )
  }

  return (
    <div className="featured-container">
      <h2 >Featured Destinations</h2>
      <div className="cards-list">
          <Card key={destinations.find((_, index)=> index===currentIndex).id} destination={destinations.find((_, index)=> index===currentIndex)} />
          <Card key={destinations.find((_, index)=> index===currentIndex+1).id} destination={destinations.find((_, index)=> index===currentIndex+1)} />
          {/* <Card key={destinations.find((_, index)=> index===currentIndex+2).id} destination={destinations.find((_, index)=> index===currentIndex+2)} /> */}
      </div>
      <div className="carousel-controls-vertical">
          <button onClick={prevSlide} className="carousel-btn-vertical carousel-btn-prev-vertical" disabled={isAtStart}>
            <i className="fas fa-chevron-up"></i>
          </button>
          <button onClick={nextSlide} className="carousel-btn-vertical carousel-btn-next-vertical" disabled={isAtEnd}>
            <i className="fas fa-chevron-down"></i>
          </button>
      </div>
    </div>
  )
}