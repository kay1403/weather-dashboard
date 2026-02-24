function WeatherCard({ data, unit, toggleUnit, onRefresh, isRandom }) {
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  if (isRandom) {
    // SMALL VERSION
    return (
      <div className="mt-10 bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow w-full max-w-sm text-center">
        <h3 className="font-bold text-xl">{data.name}</h3>
        <p className="text-3xl font-black">
          {Math.round(data.main.temp)}{tempUnit}
        </p>
        <p className="opacity-70 text-sm">
          {data.weather[0].description}
        </p>
      </div>
    );
  }

  // BIG VERSION (after user search)
  return (
    <div className="mt-10 w-full max-w-md flex flex-col items-center">

      <h2 className="text-3xl font-black uppercase">
        {data.name}
      </h2>

      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
        alt={data.weather[0].main}
        className="w-32"
      />

      <div className="text-6xl font-black my-4">
        {Math.round(data.main.temp)}{tempUnit}
      </div>

      <p className="mb-6 opacity-70">{data.weather[0].description}</p>

      <div className="grid grid-cols-2 gap-4 w-full">

        <div className="card">
          <p>Wind</p>
          <p>{data.wind.speed} {windUnit}</p>
        </div>

        <div className="card">
          <p>Humidity</p>
          <p>{data.main.humidity}%</p>
        </div>

        <div className="card">
          <p>Feels Like</p>
          <p>{Math.round(data.main.feels_like)}{tempUnit}</p>
        </div>

        <div className="card">
          <p>Pressure</p>
          <p>{data.main.pressure} hPa</p>
        </div>

      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={toggleUnit}
          className="px-6 py-2 rounded-full bg-black text-white"
        >
          Toggle °C/°F
        </button>

        <button
          onClick={onRefresh}
          className="px-6 py-2 rounded-full bg-blue-500 text-white"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default WeatherCard;