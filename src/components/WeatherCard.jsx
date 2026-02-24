function WeatherCard({ data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center w-80">
      <h2 className="text-xl font-bold">{data.name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
        className="mx-auto"
      />
      <p className="mt-2">Temperature: {data.main.temp}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
      <p className="capitalize">{data.weather[0].description}</p>
    </div>
  );
}

export default WeatherCard;