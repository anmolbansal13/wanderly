import React, { useState, useEffect } from "react";
import "./Carousel.css";

const url =import.meta.env.VITE_BACKEND_URL;
export default function Carousel({ selectedCity }) {
  const [images, setImages] = useState([
    {
      id: 0,
      url: "/photos/AdDdOWqqcaKpAm3HOh4ZJk-n5I8J9aMtCdBEQ4qzVDlq6Sq6LtoZtAqi3FcPizVSxsz2GgzZdM5zZFhXtIVLeBqREuFlsXZtjjEYObDP429ec8Pd5x9KgCjtvL4Y6TagGTjyUJlMXlsCIPn9i4j25PibvrIAWNZblpGFqm4racK2YVUkWWWC",
      description: "View of the location",
    },
  ]);
  
  const [cityInfo, setCityInfo] = useState({
    name: "MANALI",
    description: "Default description",
    address: ""
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (selectedCity) {
      const fetchPlaceDetails = async () => {
        try {
          const response = await fetch(
            `${url}/getPlaceDetails?placeid=${selectedCity}`
          );
          const data = await response.json();

          setCityInfo({
            name: data.name,
            description: data.description,
            address: data.address
          });

          if (data.photos && data.photos.length > 0) {
            const photoUrls = data.photos.map(photo => ({
              id: photo.id,
              url: photo.url,
              description: photo.description
            }));
            setImages(photoUrls);
          }
        } catch (error) {
          console.error("Error fetching place details:", error);
        }
      };

      fetchPlaceDetails();
    }
  }, [selectedCity]);

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

  return (
    <div className="carousel">
      <h2 className="searchedCityName">{cityInfo.name}</h2>
      <p className="searchedCityDescription">{cityInfo.description}</p>
      <p className="searchedCityAddress">{cityInfo.address}</p>

      <div className="carousel-wrapper">
        <button className="carousel-btn prev" onClick={prevSlide}>
          ❮
        </button>
        <div className="carousel-images">
          <img
            src={url+images[currentIndex].url}
            alt="loading...."
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