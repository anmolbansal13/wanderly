import React, { useState, useEffect } from "react";
import "./Carousel.css";

const url = "http://localhost:3000";

export default function Carousel({ selectedCity }) {
  const [images, setImages] = useState([
    {
      id: 1,
      url: "https://www.indiadrivertours.com/wp-content/uploads/2017/06/tpkg-manalitour.jpg",
      description: "A scenic view of the mountains.",
    },
    {
      id: 2,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_City.jpg/1024px-Manali_City.jpg",
      description: "A serene lake surrounded by forests.",
    },
    {
      id: 3,
      url: "https://storage.googleapis.com/stateless-www-justwravel-com/2024/09/dd5f41a7-places-to-visit-in-manali--1024x668.png",
      description: "A snow-covered mountain under a blue sky.",
    },
  ]);
  const [cityInfo, setCityInfo] = useState({
    name: "MANALI",
    description: "Default description",
  });

  useEffect(() => {
    if (selectedCity) {
      // Fetch place details using Google Places API
      const fetchPlaceDetails = async () => {
        try {
          const response = await fetch(
            `${url}/getPlaceDetails?placeid=${selectedCity.place_id}`
          );
          const data = await response.json();

          // Update city info
          setCityInfo({
            name: data.name,
            description: data.description,
          });

          // Fetch place photos
          // const photosResponse = await fetch(
          //   `${url}/getPlaceDetails?placeid=${selectedCity.place_id}`
          // );
          setImages(data.photos);
        } catch (error) {
          console.error("Error fetching place details:", error);
        }
      };

      fetchPlaceDetails();
    }
  }, [selectedCity]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentImage = images.find((_, id) => id === currentIndex);

  if (!currentImage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel">
      <h2 className="searchedCityName">{cityInfo.name}</h2>
      <p className="searchedCityDescription">{cityInfo.description}</p>

      <div className="carousel-wrapper">
        <button className="carousel-btn prev" onClick={prevSlide}>
          ❮
        </button>
        <div className="carousel-images">
          <img
            src={currentImage.url}
            alt={currentImage.description}
            className="carousel-img active"
          />
        </div>
        <button className="carousel-btn next" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </div>
  );
}
