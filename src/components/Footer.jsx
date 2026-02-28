import { motion } from "framer-motion";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-auto relative z-10">
      <div className="container mx-auto px-6">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm opacity-40">👨‍💻</span>
              <p className="font-medium text-sm opacity-40">
                Created by <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Ange Koumba</span>
              </p>
            </motion.div>

         

            <p className="text-sm opacity-40">
              © {currentYear} WeatherFlow. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;