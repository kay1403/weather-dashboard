import { useState } from "react";

function SearchBar({ onSearch, recentCities }) {
  const [city, setCity] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
    setCity("");
  };

  return (
    <div className="w-full relative">

      <form onSubmit={handleSubmit} className="flex">
        <input
          required
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 p-3 rounded-l border border-gray-300 dark:text-black focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          🔍
        </button>
      </form>

      {/* HISTORY BUTTON */}
      <div className="flex justify-end mt-2">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-sm opacity-70 hover:opacity-100"
        >
          ⭐ Recent Cities
        </button>
      </div>

      {showHistory && (
        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow rounded-xl p-4 w-48 z-10">
          {recentCities.length === 0 && (
            <p className="text-sm opacity-50">No recent cities</p>
          )}

          {recentCities.map((c) => (
            <div
              key={c}
              onClick={() => {
                onSearch(c);
                setShowHistory(false);
              }}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
            >
              {c}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default SearchBar;