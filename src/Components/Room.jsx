import React from "react";
import CandleBlow from "./CandleBlow";
import Gramophone from "./Gramophone";
import GiftChair from "./GiftChair";
import { motion } from "framer-motion";

const Room = () => {
  return (
    <div className="flex flex-col justify-end items-center min-h-screen bg-[#0b1e26] relative overflow-hidden">
      {/* ✨ Wall glow */}
      <div className="absolute w-[800px] h-[800px] bg-[#f8c63c22] blur-3xl rounded-full top-1/3"></div>

      {/* 🧶 Animated string lights */}
      <div className="absolute top-10 w-full flex justify-center">
        <div className="flex gap-3">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.4] }}
              transition={{
                repeat: Infinity,
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 2,
              }}
              className={`w-2 h-2 rounded-full ${
                i % 3 === 0
                  ? "bg-yellow-400"
                  : i % 3 === 1
                  ? "bg-pink-400"
                  : "bg-blue-400"
              } shadow-lg`}
            />
          ))}
        </div>
      </div>

      {/* 🪞 Wall Frames */}
      <div className="absolute top-40 left-24 flex flex-col gap-6">
        <div className="w-24 h-20 bg-[#2c3e50] border-4 border-[#a47551] rounded-lg shadow-inner"></div>
        <div className="w-16 h-16 bg-[#2c3e50] border-4 border-[#a47551] rounded-lg shadow-inner"></div>
      </div>

      <div className="absolute top-44 right-28 w-20 h-24 bg-[#2c3e50] border-4 border-[#a47551] rounded-lg shadow-inner"></div>

      {/* 🪴 Shelf with Plant and Clock */}
      <div className="absolute top-64 left-1/3 flex items-center gap-6">
        <div className="w-32 h-2 bg-[#6b4f2a] rounded-md shadow-md relative">
          <div className="absolute -top-6 left-3 w-4 h-6 bg-green-500 rounded-t-full"></div>
          <div className="absolute -top-6 left-8 w-3 h-3 bg-green-600 rounded-full"></div>
          <div className="absolute -top-7 right-3 w-6 h-6 border-4 border-[#d9b26c] rounded-full"></div>
        </div>
      </div>

      {/* 🪶 Floating sparkles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-[#fff7d1] rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 60}%`,
            opacity: 0.6,
          }}
          animate={{
            y: [0, -50 - Math.random() * 30],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + Math.random() * 2,
          }}
        />
      ))}

      {/* 🪵 Floor */}
      <div className="absolute bottom-0 w-full h-32 bg-[#3a2d22] border-t-4 border-[#1f140e]"></div>

      {/* 🏡 Rug under cake */}
      <div className="absolute bottom-24 w-[400px] h-24 bg-[#874e3e] opacity-70 rounded-full blur-sm"></div>

      {/* 🍰 Cake + Candle */}
      <div className="absolute bottom-32 flex justify-center w-full">
        <CandleBlow />
      </div>

      {/* ✨ Candle instruction */}
      <motion.div
        className="absolute top-[270px] text-[#f8e5b8] text-lg font-semibold"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        💨 Blow the candle!
      </motion.div>

      {/* 🎵 Gramophone (right) */}
      <div className="absolute bottom-20 flex justify-end w-full pr-24">
        <Gramophone musicUrl="src/assets/music/SochNaSake.mp3" />
      </div>

      {/* 🎵 Gramophone text */}
      <motion.div
        className="absolute top-[250px] right-[200px] text-[#f8e5b8] text-lg font-semibold"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      >
        🎶 Click the gramophone to play music
      </motion.div>

      {/* 🎁 Gift Chair (left) */}
      <div className="absolute bottom-32 flex justify-start w-full pl-24">
        <GiftChair />
      </div>

      {/* 🎁 Gift text */}
      <motion.div
        className="absolute top-[350px] left-[100px] text-[#f8e5b8] text-lg font-semibold"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
      >
        🎁 Open your gifts!
      </motion.div>
    </div>
  );
};

export default Room;
