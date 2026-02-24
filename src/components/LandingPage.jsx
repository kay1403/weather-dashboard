function LandingPage({ onStart }) {
  return (
    <div className="h-screen w-full bg-cover bg-center relative flex flex-col justify-between items-center"
         style={{ backgroundImage: "url('/landing-bg.jpg')" }}>
      
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div> {/* blur + dark overlay */}
      
      <div className="z-10 w-full flex justify-end p-6">
        <span className="text-white text-2xl">☀️</span>
      </div>

      <div className="z-10 text-center mb-auto mt-20">
        <h1 className="text-white text-3xl sm:text-5xl font-black lowercase">
        Weather Anytime, Anywhere        
        </h1>
      </div>

      <div className="z-10 mb-20">
        <button
          onClick={onStart}
          className="bg-blue-500 text-white px-10 py-4 rounded-full text-xl hover:scale-105 transition-transform duration-500"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;