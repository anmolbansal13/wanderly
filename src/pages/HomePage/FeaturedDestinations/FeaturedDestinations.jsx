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
    rating: 4.3,
    description:
      "Manali is a hill station in the Kullu, known for its snow-capped mountains and picturesque landscapes.",
  },
  {
    id: 2,
    name: "Jaipur, Rajasthan, India",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
    rating: 4.2,
    description:
      "Jaipur is a popular tourist destination known for its beauty, history, and architecture",
  },
  {
    id: 3,
    name: "Delhi, India",
    image: "https://exploreio.in/wp-content/uploads/2024/01/202664.jpg",
    rating: 3.8,
    description:
      "Delhi is a symbol of its rich cultural past and thriving present, a city most cherished and visited by all.",
  },
  {
    id: 4,
    name: "Leh",
    image:
      "https://www.remotelands.com/storage/media/4183/conversions/b160729204-banner-size.jpg",
    rating: 4.2,
    description: " Barren mountains with brightly painted monasteries, fluttering prayer flags, rocky ridges, and tiny settlements add to the overall charm of the region.",
  },
  {
    id: 5,
    name: "Spiti, Himachal Pradesh, India",
    image:
      "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2023/12/13/b9e1b5bbf87f3ec75c09613f9378b564_1000x1000.jpg",
    rating: 4.8,
    description: "This majestic cold desert valley is replete with pine forests, green meadows and beautiful monasteries will leave you totally awe-stuck",
  },
  {
    id: 6,
    name: "Darjeeling, West Bengal, India",
    image:
      "https://sikkimtourism.org/wp-content/uploads/2022/06/darjeeling.jpg",
    rating: 4.1,
    description: "Darjeeling is famous throughout the world for the tea it grows and the great view of the Kanchenjunga range of mountains that it offers",
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
