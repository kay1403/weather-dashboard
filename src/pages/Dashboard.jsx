import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [theme, setTheme] = useState("light");
  const [isRandom, setIsRandom] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(saved);

    const randomCities = ["Paris", "London", "Tokyo", "New York", "Dubai"];
    const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
    handleSearch(randomCity, unit, true);
  }, []);

  const saveRecentCity = (city) => {
    let updated = [city, ...recentCities.filter(c => c !== city)];
    if (updated.length > 5) updated = updated.slice(0, 5);
    setRecentCities(updated);
    localStorage.setItem("recentCities", JSON.stringify(updated));
  };

  const handleSearch = async (city, customUnit = unit, random = false) => {
    setLoading(true);
    setError("");
    
    try {
      const data = await getCurrentWeather(city, customUnit);
      setWeather(data);

      if (!random) {
        saveRecentCity(city);
        setIsRandom(false);
      } else {
        setIsRandom(true);
      }

      const mainWeather = data.weather[0].main.toLowerCase();
      const weatherThemes = {
        rain: "dark",
        clouds: "dark",
        thunderstorm: "dark",
        snow: "light",
        clear: "light"
      };
      setTheme(weatherThemes[mainWeather] || "light");

    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
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

  const getBackgroundClass = () => {
    if (!weather) return "bg-gradient-to-br from-blue-400 to-blue-600";
    
    const weatherMain = weather.weather[0].main.toLowerCase();
    const backgrounds = {
      clear: "bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500",
      clouds: "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600",
      rain: "bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900",
      snow: "bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400",
      thunderstorm: "bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900",
      default: "bg-gradient-to-br from-blue-500 to-blue-700"
    };
    return backgrounds[weatherMain] || backgrounds.default;
  };

  return (
    <div className={`min-h-screen flex flex-col items-center px-4 transition-all duration-1000 ${getBackgroundClass()}`}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100],
              x: Math.random() * 100 - 50,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <Header />

      <main className="flex-1 w-full max-w-4xl mt-24 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <SearchBar onSearch={handleSearch} recentCities={recentCities} />

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-12"
              >
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl animate-pulse">🌤️</span>
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <ErrorMessage message={error} />
              </motion.div>
            )}

            {weather && !loading && (
              <motion.div
                key="weather"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <WeatherCard
                  data={weather}
                  unit={unit}
                  onRefresh={handleRefresh}
                  toggleUnit={toggleUnit}
                  isRandom={isRandom}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;