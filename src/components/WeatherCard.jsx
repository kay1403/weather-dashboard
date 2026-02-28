import { motion, AnimatePresence } from "framer-motion";

function WeatherCard({ data, unit, toggleUnit, onRefresh, isRandom }) {
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  const getWeatherGradient = (weather) => {
    const main = weather[0].main.toLowerCase();
    const gradients = {
      clear: 'from-yellow-400 to-orange-500',
      clouds: 'from-gray-400 to-gray-600',
      rain: 'from-blue-600 to-blue-800',
      snow: 'from-blue-200 to-blue-400',
      thunderstorm: 'from-purple-600 to-indigo-800',
      default: 'from-blue-500 to-blue-700'
    };
    return gradients[main] || gradients.default;
  };

  if (isRandom) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-card rounded-2xl p-6 w-full max-w-sm text-center cursor-pointer
                   hover:shadow-2xl transition-all duration-500 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <h3 className="font-bold text-2xl mb-2">{data.name}</h3>
          <p className="text-5xl font-black mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            {Math.round(data.main.temp)}{tempUnit}
          </p>
          <div className="flex items-center justify-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].main}
              className="w-16 h-16 group-hover:scale-110 transition-transform duration-300"
            />
            <p className="opacity-70 text-sm capitalize">
              {data.weather[0].description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`weather-card w-full max-w-2xl bg-gradient-to-br ${getWeatherGradient(data.weather)}`}
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-4xl font-black mb-2 text-white">{data.name}</h2>
          <p className="text-white/80 text-lg capitalize">
            {data.weather[0].description}
          </p>
        </div>
        <div className="text-right">
          <div className="text-7xl font-black text-white">
            {Math.round(data.main.temp)}{tempUnit}
          </div>
          <p className="text-white/70">
            Feels like {Math.round(data.main.feels_like)}{tempUnit}
          </p>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <motion.img
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].main}
          className="w-40 h-40"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="stat-card">
          <p className="text-white/70 mb-1">Wind</p>
          <p className="text-2xl font-bold text-white">
            {data.wind.speed} {windUnit}
          </p>
        </div>

        <div className="stat-card">
          <p className="text-white/70 mb-1">Humidity</p>
          <p className="text-2xl font-bold text-white">
            {data.main.humidity}%
          </p>
        </div>

        <div className="stat-card">
          <p className="text-white/70 mb-1">Pressure</p>
          <p className="text-2xl font-bold text-white">
            {data.main.pressure} hPa
          </p>
        </div>

        <div className="stat-card">
          <p className="text-white/70 mb-1">Visibility</p>
          <p className="text-2xl font-bold text-white">
            {(data.visibility / 1000).toFixed(1)} km
          </p>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleUnit}
          className="btn-secondary flex items-center gap-2"
        >
          {unit === "metric" ? "°C → °F" : "°F → °C"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRefresh}
          className="btn-primary flex items-center gap-2"
        >
          Refresh
        </motion.button>
      </div>
    </motion.div>
  );
}

export default WeatherCard;