import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const gifts = [
  {
    id: 1,
    position: "seat",
    color: "#ff4d6d",
    ribbon: "#ffd700",
    message: "🎉 Wishing you laughter and joy all day long!",
  },
  {
    id: 2,
    position: "left",
    color: "#4da6ff",
    ribbon: "#ffea00",
    message: "🎁 Every gift is small compared to your big heart!",
  },
  {
    id: 3,
    position: "right",
    color: "#7bff4d",
    ribbon: "#ff8c00",
    message: "💖 Hope your dreams sparkle brighter this year!",
  },
];

const GiftChair = () => {
  const [activeGift, setActiveGift] = useState(null);

  const handleGiftClick = (id) => {
    if (activeGift === id) setActiveGift(null);
    else setActiveGift(id);
  };

  return (
    <div className="relative flex flex-col items-center select-none scale-110">
      {/* Chair Base (tilted slightly) */}
      <div className="relative w-40 h-44 rotate-[-6deg]">
        {/* Backrest */}
        <div className="absolute w-28 h-24 bg-[#7b4a1e] border-4 border-[#3b2a15] rounded-t-xl left-1/2 -translate-x-1/2 top-0 shadow-inner"></div>
        {/* Seat */}
        <div className="absolute w-32 h-8 bg-[#8b5e34] border-4 border-[#3b2a15] rounded-md left-1/2 -translate-x-1/2 top-[88px]"></div>
        {/* Legs */}
        <div className="absolute w-2 h-14 bg-[#3b2a15] bottom-0 left-[18%] rounded-sm"></div>
        <div className="absolute w-2 h-14 bg-[#3b2a15] bottom-0 right-[20%] rounded-sm"></div>
      </div>

      {/* Gift Boxes */}
      {gifts.map((gift) => {
        // determine position
        const positionClasses =
          gift.position === "seat"
            ? "absolute top-[56px] left-1/2 -translate-x-1/2"
            : gift.position === "left"
            ? "absolute bottom-[10px] left-[10px]"
            : "absolute bottom-[10px] right-[10px]";

        return (
          <motion.div
            key={gift.id}
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGiftClick(gift.id)}
            className={`${positionClasses} w-14 h-14 border-4 border-[#3b2a15] rounded-md shadow-md cursor-pointer`}
            style={{ backgroundColor: gift.color }}
          >
            {/* Ribbon */}
            <div
              className="absolute w-3 h-full left-1/2 -translate-x-1/2"
              style={{ backgroundColor: gift.ribbon }}
            ></div>
            <div
              className="absolute h-3 w-full top-1/2 -translate-y-1/2"
              style={{ backgroundColor: gift.ribbon }}
            ></div>

            {/* Bow */}
            <div
              className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
              style={{
                backgroundColor: gift.ribbon,
                boxShadow: "0 0 4px rgba(255,255,255,0.4)",
              }}
            ></div>

            {/* Message popup */}
            <AnimatePresence>
              {activeGift === gift.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: -10, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#fff3cd] border-2 border-[#6b4f2a] text-[#3a2a10] px-3 py-2 rounded-xl shadow-xl text-xs font-semibold w-max"
                >
                  {gift.message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default GiftChair;
