import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-white/70 p-10 rounded-3xl shadow-lg max-w-lg w-full backdrop-blur-sm"
      >
        <h1 className="text-6xl font-extrabold text-[#229ED9] mb-4">404</h1>
        <p className="text-2xl font-semibold text-[#374151] mb-2">
          Page Not Found
        </p>
        <p className="text-[#6B7280] mb-6">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#229ED9] text-white font-semibold rounded-full hover:bg-[#1d8dc4] transition shadow"
        >
          <Home className="w-5 h-5" />
          Go to Home
        </button>
      </motion.div>
    </div>
  );
}
