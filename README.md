# Wanderly 🌎

###### Wanderly is your ultimate travel companion - a modern web application that helps travelers plan, manage, and organize their adventures.

## Table of Contents
- [Features](#features-)
- [Tech Stack](#tech-stack-%EF%B8%8F)
- [Demo](#demo-)
- [API Endpoints](#api-endpoints-)
- [Getting Started](#getting-started-)
- [Contributing](#contributing-)
- [License](#license-)
- [Contact](#contact-)

## Features ✨

- Destination recommendations
- Interactive trip planning
- Travel itinerary creation
- Real-time routes and directions
- Budget tracking
- Real-time weather updates

## Tech Stack 🛠️

- Frontend: React.js
- Backend: Express.js
- Database: MongoDB
- Authentication: JWT
- Maps Integration: Google Maps API
- Weather API: WeatherAPI

## Demo 🎥
Live Demo: [Wanderly](https://wanderly-mern.vercel.app)


## API Endpoints 🌐
- `/autocompleteSearch` - Retrieve autocomplete suggestions for destinations
- `/getPlaceDetails` - Get detailed information about a place
- `/attractions` - Retrieve attractions based on location
- `/fetchWeather/:city` - Get weather information for a location
- `/getRoutes` - Get routes and directions


## Getting Started 🚀
### Frontend

1. Clone the repository:

```bash
git clone https://github.com/anmolbansal13/wanderly.git
```

2. Install dependencies:

```bash
cd wanderly && npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:

```env
VITE_BACKEND_URL = your_backend_url
VITE_PUBLIC_MAPS_GOOGLE_API_KEY = your_public_google_api_key
```

4. Start the development server:
```
npm run dev
```

### Backend
1. Clone the repository:

```bash
git clone https://github.com/reaper-js/wanderly-backend.git
```

2. Install dependencies:

```bash
cd wanderly-backend && npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:

```env
MONGODB_URI = your_mongodb_uri
JWT_SECRET = your_jwt_secret
GOOGLE_MAPS_API_KEY = your_google_maps_api_key
OPENWEATHER_API_KEY = your_weather_api_key
FRONTEND_URL = your_frontend_url
GOOGLE_MAPS_API_KEY = your_private_google_api_key
```

4. Start the backend server:
```
npm run dev
```
## Contributing 🤝
We welcome contributions from the community! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to the main repository.

## License 📄  
Distributed under the MIT License. See `LICENSE` for more information.  

## Contact 📧
- [Anmol Bansal](https://github.com/anmolbansal13)  
- [Jatin Saini](https://github.com/reaper-js)


###### Inspired by the love of travel and exploration
###### Built with ❤️ for travelers worldwide