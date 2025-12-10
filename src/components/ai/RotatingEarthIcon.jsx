"use client";

import { motion } from "framer-motion";

const RotatingEarthIcon = ({ size = 32, onClick, className = "" }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`cursor-pointer relative ${className}`}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      style={{ width: size, height: size }}
    >
      <motion.div
        className="w-full h-full rounded-full relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
          boxShadow: "0 4px 15px rgba(16, 185, 129, 0.4), inset -3px -3px 8px rgba(0,0,0,0.2), inset 3px 3px 8px rgba(255,255,255,0.3)"
        }}
        animate={{ rotateY: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ transform: "scale(1.1)" }}
        >
          <defs>
            <radialGradient id="earthGlow" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          
          <circle cx="50" cy="50" r="48" fill="url(#oceanGradient)" />
          
          <ellipse cx="30" cy="35" rx="18" ry="12" fill="#22c55e" opacity="0.9" />
          <ellipse cx="65" cy="30" rx="12" ry="8" fill="#16a34a" opacity="0.85" />
          <ellipse cx="55" cy="55" rx="20" ry="15" fill="#22c55e" opacity="0.9" />
          <ellipse cx="25" cy="65" rx="10" ry="8" fill="#16a34a" opacity="0.8" />
          <ellipse cx="75" cy="60" rx="8" ry="6" fill="#22c55e" opacity="0.85" />
          
          <circle cx="50" cy="50" r="48" fill="url(#earthGlow)" />
          
          <ellipse cx="35" cy="25" rx="4" ry="2" fill="rgba(255,255,255,0.4)" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)"
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full"
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ boxShadow: "0 0 6px rgba(74, 222, 128, 0.8)" }}
      />
    </motion.div>
  );
};

export default RotatingEarthIcon;
