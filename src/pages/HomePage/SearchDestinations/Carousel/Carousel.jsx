import React, { useState, useEffect } from "react";
import "./Carousel.css"; // Add custom styles

export default function CarouselTest() {
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

  const currentImage = images.find((_, index) => index === currentIndex);
  
  if (!currentImage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel">
      <h2 className="searchedCityName">MANALI</h2>
      <p className="searchedCityDescription">
        Manali is known for its snow-capped mountains, cool climate, and natural
        beauty. It's also a gateway to the Lahaul and Spiti district and the
        city of Leh in Ladakh.
      </p>

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
