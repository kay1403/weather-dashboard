import { useState, useEffect } from "react";

function LandingPage({ onStart }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/landing-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div 
        className="relative z-10 w-full flex flex-col items-center justify-between min-h-screen"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
      

        <div className="text-center mb-auto mt-20 px-4">
          <h1 className="text-6xl sm:text-8xl font-black text-white mb-6 leading-tight drop-shadow-lg">
            Weather
            <span className="block bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
              Anytime,
            </span>
            <span className="block bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              Anywhere
            </span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 drop-shadow">
            Discover a unique weather experience with accurate forecasts 
            and a modern, intuitive interface
          </p>
        </div>

        <div className="mb-20 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-blue-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
          <button
            onClick={onStart}
            className="relative px-12 py-5 bg-black text-white rounded-full text-xl font-bold 
                     hover:scale-110 transition-all duration-500 flex items-center gap-3
                     shadow-2xl group-hover:shadow-blue-500/50"
          >
            <span>Get Started</span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;