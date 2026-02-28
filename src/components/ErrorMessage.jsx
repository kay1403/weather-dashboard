import { motion } from "framer-motion";

function ErrorMessage({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-6 glass-card bg-red-500/20 border-red-500/30 rounded-2xl p-6 max-w-md mx-auto"
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl animate-bounce">⚠️</div>
        <div>
          <h3 className="font-bold text-red-600 dark:text-red-400 text-lg mb-1">
            Oops! An error occurred
          </h3>
          <p className="text-red-600/80 dark:text-red-400/80">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default ErrorMessage;