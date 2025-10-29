import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const Gramophone = ({ musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="absolute bottom-32 right-24 flex flex-col items-center select-none"
    >
      {/* 🎵 Floating hint */}
      {!isPlaying && (
        <motion.div
          className="absolute -top-14 -left-40 text-[#f8e5b8] text-lg font-semibold"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          🎵 Tap to play music!
        </motion.div>
      )}

      {/* Gramophone base */}
      <div className="w-52 h-4 bg-linear-to-b from-[#7b4b2a] to-[#4b2d21] border-t-2 border-[#2a1a12] rounded-t-md shadow-lg relative z-0"></div>

      {/* Legs */}
      <div className="flex justify-between w-40 mt-[1px]">
        <div className="w-3 h-16 bg-linear-to-b from-[#5a3b2e] to-[#2e1b13] border-2 border-[#1a0d07] rounded-b-sm"></div>
        <div className="w-3 h-16 bg-linear-to-b from-[#5a3b2e] to-[#2e1b13] border-2 border-[#1a0d07] rounded-b-sm"></div>
      </div>

      {/* Gramophone body */}
      <motion.div
        onClick={toggleMusic}
        animate={isPlaying ? { y: [0, -2, 0, 2, 0] } : { y: 0 }}
        transition={{
          repeat: isPlaying ? Infinity : 0,
          duration: 3,
          ease: "easeInOut",
        }}
        className="relative -mt-[300px] cursor-pointer flex flex-col items-center group"
      >
        {/* Horn */}
        <motion.div
          animate={isPlaying ? { rotate: [0, 3, -3, 0] } : { rotate: 0 }}
          transition={{
            repeat: isPlaying ? Infinity : 0,
            duration: 3,
            ease: "easeInOut",
          }}
          className="w-28 h-28 bg-linear-to-br from-[#b48a45] to-[#614c29] rounded-full border-[3px] border-[#2a1a12] shadow-[inset_0_4px_8px_rgba(255,255,255,0.2)] flex items-center justify-center relative overflow-visible"
        >
          <div className="w-8 h-8 bg-[#2a1a12] rounded-full"></div>

          {/* 🎶 Floating Notes */}
          {isPlaying && (
            <>
              <motion.div
                className="absolute text-yellow-300 text-2xl drop-shadow-[0_0_6px_rgba(255,230,100,0.8)]"
                animate={{
                  x: [0, -30],
                  y: [-10, -80],
                  opacity: [1, 0],
                  scale: [1, 1.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  delay: 0.4,
                  ease: "easeOut",
                }}
                style={{ left: "10px", top: "-10px" }}
              >
                🎶
              </motion.div>
              <motion.div
                className="absolute text-yellow-200 text-2xl drop-shadow-[0_0_8px_rgba(255,255,180,0.9)]"
                animate={{
                  x: [0, -40],
                  y: [-20, -100],
                  opacity: [1, 0],
                  scale: [1, 1.4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  delay: 1,
                  ease: "easeOut",
                }}
                style={{ left: "20px", top: "-20px" }}
              >
                🎵
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Record player box */}
        <div className="w-38 h-22 bg-linear-to-b from-[#523521] to-[#2e1b13] border-4 border-[#1c0f07] rounded-md flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.5)] mt-1 relative">
          {/* Spinning record (larger and more visible) */}
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              repeat: isPlaying ? Infinity : 0,
              ease: "linear",
              duration: 1.6,
            }}
            className="w-18 h-18 bg-[#0f0f0f] rounded-full border-[3px] border-[#555] relative shadow-[0_0_10px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute inset-4 bg-[#d9b88c] rounded-full"></div>
            <div className="absolute inset-[35%] bg-[#2a1a12] rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Audio */}
      <audio ref={audioRef} src={musicUrl}></audio>
    </motion.div>
  );
};

export default Gramophone;
