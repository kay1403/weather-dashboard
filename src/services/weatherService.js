const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getCurrentWeather = async (city, unit = "metric") => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};