import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const gifts = [
  {
    id: 1,
    position: "seat",
    color: "#ff4d6d",
    ribbon: "#ffd700",
    message: "🌟 You've grown so much — keep shining, dreamer!",
    note: "Hey dumbo, happy 22nd birthday! 🎉 Can you believe it? The kid who once had big dreams and endless energy has grown up so much and come such a long way. You’ve faced challenges, learned from them, and kept moving forward... and honestly, I couldn’t be prouder of the person you’ve become. Here’s to more growth, more laughter, and even greater things ahead. Keep being you!",
  },
  {
    id: 2,
    position: "left",
    color: "#4da6ff",
    ribbon: "#ffea00",
    message: "💙 Through every up and down — you’re my constant.",
    note: "Thank you for being there through all my ups and downs...honestly, I don’t even know how to put it into words, but my life just wouldn’t feel complete without you. I know a lot has happened between us, but no matter what, I’ve always got your back. Here’s to you, to everything you’ve achieved, and to all the amazing things still waiting ahead. 💫",
  },
  {
    id: 3,
    position: "right",
    color: "#7bff4d",
    ribbon: "#ff8c00",
    message: "🔥 Stay bold, stay fierce — never lose that spark!",
    note: "And just want to say... you got this, okay? You’ve got a great life ahead, so never think you’re falling behind. You’re truly one of the most amazing and coolest people I’ve ever met. And please, never lose that “bitch” attitude... it totally suits you. 😎💫",
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
    <>
      {/* 🪑 Chair & Gifts */}
      <div className="relative flex flex-col items-center select-none scale-110">
        {/* Chair */}
        <div className="relative w-40 h-44">
          {/* Backrest */}
          <div className="absolute w-28 h-24 bg-[#7b4a1e] border-4 border-[#3b2a15] rounded-t-xl left-1/2 -translate-x-1/2 top-0 shadow-inner"></div>

          {/* Seat */}
          <div className="absolute w-32 h-8 bg-[#8b5e34] border-4 border-[#3b2a15] rounded-md left-1/2 -translate-x-1/2 top-[88px] z-10"></div>

          {/* Legs */}
          <div className="absolute w-2 h-14 bg-[#3b2a15] bottom-0 left-[28%] rounded-sm"></div>
          <div className="absolute w-2 h-14 bg-[#3b2a15] bottom-0 right-[28%] rounded-sm"></div>
        </div>

        {/* 🎁 Gifts */}
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
      </div>

      {/*  Floating Note  */}
      <AnimatePresence>
        {showNote && activeGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[999]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              className="relative bg-[#fffefb] w-[90%] sm:w-[500px] md:w-[600px] max-h-[80vh] p-8 rounded-2xl shadow-2xl border-4 border-[#d4b483] text-[#3a2a10] font-medium leading-relaxed overflow-auto"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(#e6f1ff 0px, #e6f1ff 28px, #ffffff 29px),
                  linear-gradient(to right, #ff9999 50px, transparent 50px)
                `,
                backgroundSize: "100% 30px, 100% 100%",
                backgroundRepeat: "repeat, no-repeat",
                boxShadow: "0 0 35px rgba(248,198,60,0.6)",
                fontFamily: "'Patrick Hand', cursive",
              }}
            >
              <button
                onClick={closeNote}
                className="absolute top-4 right-6 text-[#6b4f2a] hover:text-[#b48a45] text-lg font-bold"
              >
                ✖
              </button>

              <h3 className="text-2xl font-semibold mb-4 text-[#c49a3a] text-center">
                {activeGift.message}
              </h3>

              <p className="text-lg px-4 text-center whitespace-pre-wrap leading-relaxed">
                {activeGift.note}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GiftChair;
