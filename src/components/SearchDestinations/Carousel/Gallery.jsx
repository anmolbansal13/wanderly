import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Gallery.css";
const url = import.meta.env.VITE_BACKEND_URL;

export default function Gallery({
  selectedCity,
  isLoggedIn,
  setLoginPopup,
  cityName,
  fromCity,
  selectedDate,
}) {
  const navigate = useNavigate();

  const [images, setImages] = useState([
    {
      id: 0,
      url: "https://via.placeholder.com/700x450/333/fff?text=Loading...",
      description: "Loading image...",
    },
  ]);

  const [cityInfo, setCityInfo] = useState({
    name: "",
    description: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState(false);

  useEffect(() => {
    setIsCitySelected(!!cityName && !!selectedCity);
  }, [cityName, selectedCity]);

  useEffect(() => {
    if (selectedCity) {
      const fetchPlaceDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${url}/getPlaceDetails?placeid=${selectedCity}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          setCityInfo({
            name: data.name || "Unknown Location",
            description: data.description || "",
            address: data.address || "",
          });

          if (data.photos && data.photos.length > 0) {
            const photoUrls = data.photos.map((photo, index) => ({
              id: photo.id || index,
              url: photo.url,
              description: photo.description || `Photo ${index + 1}`,
            }));
            setImages(photoUrls);
          } else {
            // Fallback image if no photos available
            setImages([
              {
                id: 0,
                url: "https://via.placeholder.com/700x450/666/fff?text=No+Images+Available",
                description: "No images available",
              },
            ]);
          }
        } catch (error) {
          console.error("Error fetching place details:", error);
          setImages([
            {
              id: 0,
              url: "https://via.placeholder.com/700x450/ff6b6b/fff?text=Error+Loading+Images",
              description: "Error loading images",
            },
          ]);
        } finally {
          setLoading(false);
        }
      };

      fetchPlaceDetails();
    }
  }, [selectedCity]);

  const handleStartTrip = async () => {
    if (!isCitySelected) {
      return;
    }

    if (isLoggedIn) {
      try {
        await navigate(`/offtrip/${encodeURIComponent(cityName)}`);
      } catch (error) {
        console.error("Navigation error:", error);
      }
    } else {
      setLoginPopup(`/offtrip/${encodeURIComponent(cityName)}`);
    }
  };

  return (
    <div className="w-full overflow-auto">
      {/* Add custom styles to override carousel height */}
      <style jsx>{`
        .custom-carousel-container {
          height: auto !important;
          min-height: auto !important;
        }
        .custom-carousel-container .carousel {
          height: auto !important;
        }
        .custom-carousel-container .carousel .slider-wrapper {
          height: auto !important;
        }
        .custom-carousel-container .carousel .slider {
          height: auto !important;
        }
      `}</style>

      {/* Carousel Section with Overlay Button */}
      <div className="text-center max-w-6xl mx-auto p-5">
        <div className="relative w-full mx-auto overflow-hidden rounded-2xl">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-2xl">
              <div className="text-white text-xl">Loading images...</div>
            </div>
          ) : (
            <div className="relative">
              <Carousel
                autoPlay={images.length > 1}
                interval={3500}
                transitionTime={600}
                infiniteLoop={images.length > 1}
                showThumbs={false}
                showStatus={false}
                showIndicators={images.length > 1}
                stopOnHover={true}
                swipeable={true}
                emulateTouch={true}
                className="custom-carousel-container w-full"
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev &&
                  images.length > 1 && (
                    <button
                      onClick={onClickHandler}
                      title={label}
                      className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 w-10 h-10 flex items-center justify-center rounded-full text-lg transition-all duration-300 ease-in-out z-20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                      aria-label="Previous image"
                    >
                      ❮
                    </button>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext &&
                  images.length > 1 && (
                    <button
                      onClick={onClickHandler}
                      title={label}
                      className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 w-10 h-10 flex items-center justify-center rounded-full text-lg transition-all duration-300 ease-in-out z-20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                      aria-label="Next image"
                    >
                      ❯
                    </button>
                  )
                }
              >
                {images.map((img, index) => (
                  <div
                    key={img.id || index}
                    className="relative border-4 border-white rounded-2xl"
                  >
                    <img
                      src={
                        img.url.startsWith("http")
                          ? img.url
                          : `${url}${img.url}`
                      }
                      alt={img.description || `Destination image ${index + 1}`}
                      className="h-[400px] w-[600px] object-cover rounded-2xl"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/700x450/666/fff?text=Image+Not+Found";
                      }}
                      loading="lazy"
                    />
                    <div className="mb-6 absolute bottom-4 left-4 right-20 bg-black/25 text-white p-2 rounded-lg text-sm">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {cityInfo.name || "Select a destination"}
                      </h2>
                      {cityInfo.address && (
                        <p className="text-lg text-gray-200">
                          {cityInfo.address}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </Carousel>
              {/* {img.description && img.description !== `Photo ${index + 1}` && (
                <div className="absolute bottom-4 left-4 right-20 bg-black/25 text-white p-2 rounded-lg text-sm">
                  {img.description}
                </div>
              )} */}

              {/* Overlay Start Trip Button */}
              <div className="absolute top-4 right-4 z-101">
                <button
                  onClick={handleStartTrip}
                  disabled={!isCitySelected || loading}
                  className={`
                    group relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 ease-in-out transform backdrop-blur-sm border
                    ${
                      isCitySelected && !loading
                        ? "bg-gradient-to-r from-blue-500/90 to-purple-600/90 hover:from-blue-600/95 hover:to-purple-700/95 text-white border-white/20 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                        : "bg-gray-800/80 text-gray-400 border-gray-600/50 cursor-not-allowed"
                    }
                    focus:outline-none focus:ring-2 focus:ring-white/50
                  `}
                  aria-label={
                    isCitySelected
                      ? "Start your trip"
                      : "Please select a destination first"
                  }
                >
                  {/* Background glow effect */}
                  {isCitySelected && !loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
                  )}

                  <div className="relative flex items-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-sm">Loading...</span>
                      </>
                    ) : isCitySelected ? (
                      <>
                        <span>Start Trip</span>
                        <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
                          ✈️
                        </span>
                      </>
                    ) : (
                      <span className="text-sm">Choose Destination</span>
                    )}
                  </div>

                  {/* Status indicator tooltip */}
                  {isCitySelected && (
                    <div className="absolute -top-12 right-0 bg-black/80 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {isLoggedIn ? "Ready to go!" : "Login required"}
                      <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {cityInfo.description && (
          <div className="mt-6 text-gray-300 text-left max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-2 text-center">
              About this destination
            </h3>
            <p className="leading-relaxed text-center">
              {cityInfo.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
