import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const gifts = [
  {
    id: 1,
    position: "seat",
    color: "#ff4d6d",
    ribbon: "#ffd700",
    message: "🎉 Wishing you laughter and joy all day long!",
    note: "Every candle you blow, every wish you make — may it all come true. Happy Birthday! 🎂✨",
  },
  {
    id: 2,
    position: "left",
    color: "#4da6ff",
    ribbon: "#ffea00",
    message: "🎁 Every gift is small compared to your big heart!",
    note: "Just like this tiny box hides a smile, may your day be filled with beautiful surprises! 💝",
  },
  {
    id: 3,
    position: "right",
    color: "#7bff4d",
    ribbon: "#ff8c00",
    message: "💖 Hope your dreams sparkle brighter this year!",
    note: "Here’s to chasing dreams, spreading joy, and shining brighter than ever this year! 🌟",
  },
];

const GiftChair = () => {
  const [activeGift, setActiveGift] = useState(null);
  const [showNote, setShowNote] = useState(false);

  const handleGiftClick = (gift) => {
    setActiveGift(gift);
    setShowNote(true);
  };

  const closeNote = () => {
    setShowNote(false);
    setTimeout(() => setActiveGift(null), 400);
  };

  return (
    <div className="relative flex flex-col items-center select-none scale-110">
      {/* 🪑 Chair Base (Straight & Centered) */}
      <div className="relative w-40 h-44">
        {/* Backrest */}
        <div className="absolute w-28 h-24 bg-[#7b4a1e] border-4 border-[#3b2a15] rounded-t-xl left-1/2 -translate-x-1/2 top-0 shadow-inner"></div>

        {/* Seat */}
        <div className="absolute w-32 h-8 bg-[#8b5e34] border-4 border-[#3b2a15] rounded-md left-1/2 -translate-x-1/2 top-[88px] z-10"></div>

        {/* Legs */}
        <div className="absolute w-2 h-14 bg-[#3b2a15] bottom-0 left-[28%] rounded-sm"></div>
        <div className="absolute w-2 h-14 bg-[#3b2a15] bottom-0 right-[28%] rounded-sm"></div>
      </div>

      {/* 🎁 Gift Boxes beside the legs */}
      {gifts.map((gift) => {
        let positionClasses = "";
        if (gift.position === "seat")
          positionClasses = "absolute top-[60px] left-1/2 -translate-x-1/2 z-20";
        else if (gift.position === "left")
          positionClasses = "absolute bottom-[8px] left-[-55px] z-10";
        else
          positionClasses = "absolute bottom-[8px] right-[-55px] z-10";

        return (
          <motion.div
            key={gift.id}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGiftClick(gift)}
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
          </motion.div>
        );
      })}

      {/* 📝 Paper Note Popup */}
      <AnimatePresence>
        {showNote && activeGift && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[100]"
          >
            <motion.div
              initial={{ rotate: -1 }}
              animate={{ rotate: [0, -1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="relative bg-[#fffefb] w-[90%] sm:w-[500px] md:w-[600px] h-[50vh] p-6 rounded-2xl shadow-2xl border-4 border-[#d4b483] text-[#3a2a10] font-medium leading-relaxed overflow-auto"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(#e6f1ff 0px, #e6f1ff 28px, #ffffff 29px),
                  linear-gradient(to right, #ff9999 40px, transparent 40px)
                `,
                backgroundSize: "100% 30px, 100% 100%",
                backgroundPosition: "0 0, 0 0",
                backgroundRepeat: "repeat, no-repeat",
                boxShadow: "0 0 25px rgba(248,198,60,0.5)",
                fontFamily: "'Patrick Hand', cursive",
              }}
            >
              <button
                onClick={closeNote}
                className="absolute top-3 right-4 text-[#6b4f2a] hover:text-[#b48a45] text-lg font-bold"
              >
                ✖
              </button>
              <h3 className="text-xl font-semibold mb-4 text-[#c49a3a] text-center">
                {activeGift.message}
              </h3>
              <p className="text-base px-6 whitespace-pre-wrap text-center">
                {activeGift.note}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GiftChair;
