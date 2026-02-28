import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SearchBar({ onSearch, recentCities }) {
  const [city, setCity] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
    setCity("");
    setShowHistory(false);
  };

  return (
    <div ref={searchRef} className="w-full relative">
      <motion.form 
        onSubmit={handleSubmit} 
        className="relative"
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <input
          required
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="input-field pr-24"
        />
        
        <motion.button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 
                     bg-gradient-to-r from-blue-500 to-blue-600 
                     text-white p-3 rounded-xl hover:shadow-lg
                     transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          🔍
        </motion.button>
      </motion.form>

      <motion.button
        onClick={() => setShowHistory(!showHistory)}
        className="mt-3 text-sm opacity-70 hover:opacity-100 
                   flex items-center gap-2 px-4 py-2 rounded-full
                   bg-white/10 backdrop-blur-sm hover:bg-white/20
                   transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>⭐</span>
        Recent Cities
      </motion.button>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 glass-card rounded-xl 
                       p-3 w-64 z-50 border border-white/20"
          >
            <h4 className="text-sm font-semibold mb-2 opacity-70">
              Recent Searches
            </h4>
            
            {recentCities.length === 0 && (
              <p className="text-sm opacity-50 text-center py-4">
                No recent cities
              </p>
            )}

            {recentCities.map((c, index) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  onSearch(c);
                  setShowHistory(false);
                  setCity("");
                }}
                className="cursor-pointer hover:bg-white/20 p-3 rounded-lg
                         transition-all duration-200 flex items-center gap-2
                         group"
                whileHover={{ x: 5 }}
              >
                <span className="flex-1">{c}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;