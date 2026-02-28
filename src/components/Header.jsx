import { useState, useEffect } from "react";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="text-3xl animate-float">🌤️</div>
          <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Weather<span className="text-gray-900 dark:text-white">Flow</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm opacity-70">Live Weather</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </header>
  );
}

export default Header;