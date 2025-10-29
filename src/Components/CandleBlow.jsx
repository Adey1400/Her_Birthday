import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CandleBlow = () => {
  const [volume, setVolume] = useState(0);
  const [isBlown, setIsBlown] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    const initMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
        sourceRef.current.connect(analyserRef.current);

        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        const detectVolume = () => {
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);
          const avg = dataArrayRef.current.reduce((a, b) => a + b, 0) / bufferLength;
          setVolume(avg);
          if (avg > 85) setIsBlown(true);
          requestAnimationFrame(detectVolume);
        };

        detectVolume();
      } catch (err) {
        console.error("Microphone access denied:", err);
      }
    };

    initMic();
    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const flameSize = Math.max(0, 40 - volume / 3);

  return (
    <div className="flex flex-col items-center relative select-none">
      {/* 💨 Instruction Text (only when not blown) */}
      {!isBlown && (
        <motion.div
          className="absolute -top-16 text-[#f8e5b8] text-lg font-semibold"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          💨 Blow the candle!
        </motion.div>
      )}

      {/* Cake + Candle */}
      <div className="relative w-48 flex flex-col items-center">
        {/* Candle */}
        <div className="w-5 h-28 bg-linear-to-b from-[#d1d1d1] to-[#aaa] rounded-t-md border-2 border-black relative z-10">
          {!isBlown && (
            <motion.div
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-6"
              animate={{ y: [0, -2, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 0.4 }}
            >
              <div
                className="w-6 h-6 rounded-full bg-linear-to-t from-[#f8c63c] via-[#ffec8b] to-white border-2 border-[#b77b00] flame"
                style={{
                  height: `${flameSize}px`,
                  opacity: 1 - volume / 100,
                  transition: "height 0.2s ease, opacity 0.2s ease",
                  boxShadow: "0 0 15px 5px rgba(255,200,0,0.6)",
                }}
              ></div>
            </motion.div>
          )}
        </div>

        {/* Cake Body */}
        <div className="w-40 h-20 bg-[#b86b47] border-4 border-black rounded-t-2xl shadow-xl relative z-0 -mt-2">
          <div className="absolute top-0 w-full h-5 bg-[#f5d6a0] border-b-4 border-black rounded-b-xl"></div>
        </div>

        {/* Plate */}
        <div className="w-48 h-3 bg-linear-to-b from-[#6c757d] to-[#3a3f44] rounded-full mt-0 border-2 border-black"></div>

        {/* Table */}
        <div className="w-72 h-4 bg-linear-to-b from-[#8b5a2b] to-[#4b2d1a] border-t-2 border-[#2a1a0d] -mt-1 shadow-[0_3px_6px_rgba(0,0,0,0.6)] rounded-t-md relative z-0"></div>

        {/* Two Table Legs */}
        <div className="flex justify-center gap-40 mt-0">
          <div className="w-5 h-16 bg-linear-to-b from-[#704214] to-[#3e2410] border-x-2 border-[#2a1a0d] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] rounded-b-md"></div>
          <div className="w-5 h-16 bg-linear-to-b from-[#704214] to-[#3e2410] border-x-2 border-[#2a1a0d] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] rounded-b-md"></div>
        </div>
      </div>

      {/* 🎉 Message After Blow */}
      {isBlown && (
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
  className="absolute -top-42 text-2xl md:text-3xl font-semibold text-[#f5e8c7] text-center w-full flex justify-center"
>
  <p className="text-[#f8c63c] drop-shadow-[0_0_8px_#f8c63c] whitespace-nowrap inline-block">
    🎉 Happy Birthday Dumbo 🎉
  </p>
</motion.div>

      )}
    </div>
  );
};

export default CandleBlow;
