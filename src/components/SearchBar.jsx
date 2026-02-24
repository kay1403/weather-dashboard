import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") return;
    onSearch(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-6">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 rounded-l border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;