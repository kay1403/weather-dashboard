import { useState, useEffect } from "react";
import { getCurrentWeather } from "./services/weatherService";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import Footer from "./components/Footer";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    try {
      setError("");
      const data = await getCurrentWeather(city);
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  // Auto refresh every 5 minutes
  useEffect(() => {
    if (!weather) return;

    const interval = setInterval(() => {
      handleSearch(weather.name);
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [weather]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-100">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard data={weather} />}
      <Footer />
    </div>
  );
}

export default App;