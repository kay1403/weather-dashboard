import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ErrorMessage from "../components/ErrorMessage";
import Footer from "../components/Footer";
import { getCurrentWeather } from "../services/weatherService";

function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");
  const [recentCities, setRecentCities] = useState([]);
  const [theme, setTheme] = useState("light"); // light or dark
  const [isRandom, setIsRandom] = useState(true);

  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("recentCities")) || [];
  setRecentCities(saved);

  const randomCities = ["Paris", "London", "Tokyo", "New York", "Dubai"];
  const randomCity =
    randomCities[Math.floor(Math.random() * randomCities.length)];

  handleSearch(randomCity, unit, true);
}, []);

  const saveRecentCity = (city) => {
    let updated = [city, ...recentCities.filter(c => c !== city)];
    if (updated.length > 5) updated = updated.slice(0, 5);
    setRecentCities(updated);
    localStorage.setItem("recentCities", JSON.stringify(updated));
  };

  const handleSearch = async (city, customUnit = unit, random = false) => {
  try {
    setError("");
    const data = await getCurrentWeather(city, customUnit);
    setWeather(data);

    if (!random) {
      saveRecentCity(city);
      setIsRandom(false);
    } else {
      setIsRandom(true);
    }

    const mainWeather = data.weather[0].main.toLowerCase();
    if (["rain", "clouds", "thunderstorm"].includes(mainWeather)) {
      setTheme("dark");
    } else {
      setTheme("light");
    }

  } catch (err) {
    setWeather(null);
    setError(err.message);
  }
};
  const handleRefresh = () => {
    if (weather) handleSearch(weather.name);
  };

  const toggleUnit = () => {
  if (!weather) return;

  const newUnit = unit === "metric" ? "imperial" : "metric";
  setUnit(newUnit);
  handleSearch(weather.name, newUnit);
};

  useEffect(() => {
  if (!weather) return;

  const interval = setInterval(() => {
    handleSearch(weather.name);
  }, 300000);

  return () => clearInterval(interval);
}, [weather?.name]);

  return (
  <div
    className={`min-h-screen flex flex-col items-center px-4 transition-all duration-700
    ${theme === "light" ? "bg-[#A8D5E2]" : "bg-gray-900 text-white"}`}
  >
    <Header />

    <div className="flex flex-col items-center w-full max-w-md mt-6">

      <SearchBar onSearch={handleSearch} recentCities={recentCities} />

      {error && <ErrorMessage message={error} />}

      {weather && (
        <WeatherCard
          data={weather}
          unit={unit}
          onRefresh={handleRefresh}
          toggleUnit={toggleUnit}
          isRandom={isRandom}
        />
      )}

    </div>

    <Footer />
  </div>
);
}

export default Dashboard;