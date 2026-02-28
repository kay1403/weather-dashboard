# WeatherFlow - Modern Weather Dashboard

## Overview

WeatherFlow is a modern weather application built with React and Tailwind CSS.
It allows users to search for the current weather in any city worldwide through an elegant, dynamic, and fully responsive interface.

The application includes:

* An immersive landing page
* A randomly displayed city on load (compact view)
* A detailed weather card after user search
* A dropdown history of recent cities
* A dynamic theme based on weather conditions


## Features

### Core Features

* Real-time city search
* Current temperature display
* Wind speed
* Humidity
* Feels like temperature
* Atmospheric pressure
* Manual refresh
* Celsius / Fahrenheit toggle
* Dynamic theme based on weather conditions
* Fully responsive design


### User Experience

* Random city displayed automatically on load (compact card version)
* Detailed weather card displayed after user search
* "Recent Cities" dropdown history
* Last 5 searched cities saved via localStorage
* Automatic refresh every 5 minutes


## Technologies Used

### Frontend

* React 18
* Tailwind CSS
* Vite
* JavaScript ES6+
* Motion

### API

* OpenWeatherMap API (Current Weather Data)


## Installation

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn
* A free OpenWeatherMap account


### 1. Clone the repository

```bash
git clone https://github.com/kay1403/weather-dashboard.git
cd weather-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open in your browser:

```
http://localhost:5173
```


## Configuration

### Add your API key

Create a `.env` file in the root directory:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

Important:
Never commit your API key to GitHub.


## Usage

### 1. Landing Page

* Click on "Get Started"
* Access the dashboard

### 2. Random Weather

* A random city is displayed automatically
* Shown in a compact card format

### 3. Custom Search

* Enter a city name
* A detailed weather card appears with:

  * Temperature
  * Humidity
  * Wind
  * Feels Like
  * Pressure

### 4. Recent Cities

* Click on "Recent Cities"
* Access your last 5 searches

### 5. Actions

* Toggle between Celsius and Fahrenheit
* Manual refresh
* Automatic refresh every 5 minutes


## Project Structure

```
weather-dashboard/
├── public/
│   └── landing-bg.jpg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── LandingPage.jsx
│   │   ├── SearchBar.jsx
│   │   ├── WeatherCard.jsx
│   │   └── ErrorMessage.jsx
│   ├── pages/
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── weatherService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── README.md
```


## API Used

OpenWeatherMap – Current Weather

Endpoint:

```
https://api.openweathermap.org/data/2.5/weather?q={city}&units={units}&appid={API_KEY}
```

Parameters:

* `q` → city name
* `units` → metric or imperial
* `appid` → API key


## Deployment

### Netlify

```bash
npm run build
```

Then connect your GitHub repository to Netlify
Add the environment variable:

```
VITE_WEATHER_API_KEY
```


## Future Improvements

* Automatic geolocation detection
* 5-day forecast
* Dynamic weather animations
* Persistent favorite cities system
* Automatic dark mode based on time


## Contributions

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request


## Author

Ange Koumba

Portfolio: [https://angekoumbaportfolio.netlify.app](https://angekoumba.dev)
LinkedIn: [https://www.linkedin.com/in/angekoumba](https://linkedin.com/in/ange-koumba)
GitHub: [https://github.com/kay1403](https://github.com/your-username)
