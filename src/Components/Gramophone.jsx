import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const Gramophone = ({ musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
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
      {/* Gramophone base table */}
      <div className="w-50 h-4 bg-linear-to-b from-[#7b4b2a] to-[#4b2d21] border-t-2 border-[#2a1a12] rounded-t-md shadow-lg relative z-0"></div>

      {/* Legs */}
      <div className="flex justify-between w-40 mt-[1px]">
        <div className="w-3 h-16 bg-linear-to-b from-[#5a3b2e] to-[#2e1b13] border-2 border-[#1a0d07] rounded-b-sm"></div>
        <div className="w-3 h-16 bg-linear-to-b from-[#5a3b2e] to-[#2e1b13] border-2 border-[#1a0d07] rounded-b-sm"></div>
      </div>

      {/* Gramophone body */}
      <div
        onClick={toggleMusic}
        className="relative -mt-[300px] cursor-pointer flex flex-col items-center group"
      >
        {/* Horn */}
        <motion.div
          animate={isPlaying ? { rotate: [0, 2, -2, 0] } : {}}
          transition={{ repeat: isPlaying ? Infinity : 0, duration: 2 }}
          className="w-32 h-32 bg-linear-to-br from-[#b48a45] to-[#614c29] rounded-full border-[3px] border-[#2a1a12] shadow-[inset_0_4px_8px_rgba(255,255,255,0.2)] flex items-center justify-center"
        >
          <div className="w-8 h-8 bg-[#2a1a12] rounded-full"></div>
        </motion.div>

        {/* Record player box */}
        <div className="w-36 h-20 bg-linear-to-b from-[#523521] to-[#2e1b13] border-4 border-[#1c0f07] rounded-md flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.5)] mt-1 relative">
          {/* Spinning record */}
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, ease: "linear", duration: 3 }}
            className="w-12 h-12 bg-[#1a1a1a] rounded-full border-4 border-[#444] relative"
          >
            <div className="absolute inset-2 bg-[#d9b88c] rounded-full"></div>
          </motion.div>
        </div>
      </div>

      <audio ref={audioRef} src={musicUrl}></audio>
    </motion.div>
  );
};

export default Gramophone;
