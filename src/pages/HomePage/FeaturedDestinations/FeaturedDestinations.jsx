import React, { useState } from "react";
import Card from "./Card/Card";
import "./FeaturedDestinations.css";
import { Navigate, useNavigate } from "react-router-dom";

const destinations = [
  {
    id: 1,
    name: "Manali, Himachal Pradesh, India",
    image:
      "https://www.indiadrivertours.com/wp-content/uploads/2017/06/tpkg-manalitour.jpg",
    rating: 4.8,
    description:
      "One of the seven wonders of the world, symbol of eternal love",
  },
  {
    id: 2,
    name: "Jaipur, Rajasthan, India",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
    rating: 4.6,
    distance: "150 km",
    description: "Royal palaces, vibrant culture and historic architecture",
  },
  {
    id: 3,
    name: "Delhi, India",
    image: "https://exploreio.in/wp-content/uploads/2024/01/202664.jpg",
    rating: 4.7,
    distance: "400 km",
    description: "Pollution at its peak, but a must-visit for history buffs",
  },
  {
    id: 4,
    name: "Leh",
    image:
      "https://backpackersunited.in/_next/image?url=https%3A%2F%2Fbpu-images-v1.s3.eu-north-1.amazonaws.com%2Fuploads%2Ftestimage-pexels-anjali-vishwakarma-14477905.jpg&w=3840&q=75",
    rating: 4.5,
    distance: "320 km",
    description: "Spiritual capital of India, ancient temples and holy Ganges",
  },
  {
    id: 5,
    name: "Spiti, Himachal Pradesh, India",
    image:
      "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2023/12/13/b9e1b5bbf87f3ec75c09613f9378b564_1000x1000.jpg",
    rating: 4.9,
    distance: "890 km",
    description: "Serene waterways, houseboats and lush greenery",
  },
  {
    id: 6,
    name: "Darjeeling, West Bengal, India",
    image:
      "https://sikkimtourism.org/wp-content/uploads/2022/06/darjeeling.jpg",
    rating: 4.7,
    distance: "250 km",
    description: "City of lakes, royal palaces and romantic settings",
  },
];

export default function FeaturedDestinations({ isLoggedIn, setLoginPopup }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex + 2 >= destinations.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 2 >= destinations.length ? 0 : prevIndex + 2
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 2 < 0 ? destinations.length - 1 : prevIndex - 2
    );
  };
  const handleStartTrip = async (destinationName) => {
    if (isLoggedIn) {
      await navigate(`/offtrip/${encodeURIComponent(destinationName)}`);
    } else {
      setLoginPopup(`/offtrip/${encodeURIComponent(destinationName)}`);
    }
  };

  return (
    <div className="featured-container">
      <h2>Featured Destinations</h2>
      <div className="cards-list">
        <Card
          onclickthebutton={() =>
            handleStartTrip(destinations[currentIndex].name)
          }
          key={destinations.find((_, index) => index === currentIndex).id}
          destination={destinations.find((_, index) => index === currentIndex)}
        />
        <Card
          onclickthebutton={() =>
            handleStartTrip(destinations[currentIndex + 1].name)
          }
          key={destinations.find((_, index) => index === currentIndex + 1).id}
          destination={destinations.find(
            (_, index) => index === currentIndex + 1
          )}
        />
      </div>
      <div className="carousel-controls-vertical">
        <button
          onClick={prevSlide}
          className="carousel-btn-vertical carousel-btn-prev-vertical"
          disabled={isAtStart}
        >
          <i className="fas fa-chevron-up"></i>
        </button>
        <button
          onClick={nextSlide}
          className="carousel-btn-vertical carousel-btn-next-vertical"
          disabled={isAtEnd}
        >
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>
    </div>
  );
}
