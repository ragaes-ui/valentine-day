'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function ValentinePage() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<{id: number, left: number, delay: number}[]>([]);

  // --- KONFIGURASI PESAN ---
  const fullMessage = `Sayang, makasih banyak ya udah mau jadi Valentine aku hari ini, dan semoga untuk hari-hari seterusnya. ❤️\n\nJujur, aku  bersyukur banget punya kamu yang selalu sabar nemenin aku, bahkan di saat-saat aku lagi mumet sama tugas kuliah atau deadline kerjaan. Kamu itu 'support system' paling canggih di hidupku yang nggak akan pernah bisa diganti sama teknologi manapun.\n\nSemua usaha dan kerja kerasku sekarang ini punya satu tujuan utama: membangun masa depan yang cerah dan bahagia sama kamu.\n\nHappy Valentine's Day, my love! 🌹`;

  const messageChars = Array.from(fullMessage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.5 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setHearts(newHearts);
  }, []);

  const moveNoButton = () => {
    const x = Math.random() * 250 - 125;
    const y = Math.random() * 250 - 125;
    setNoBtnPos({ x, y });
  };

  const handleYesClick = () => {
    setYesPressed(true);
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    const colors = ['#ff1493', '#ff69b4', '#ffffff', '#ffd700'];

    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 animate-gradient overflow-hidden px-4">
      
      {/* BACKGROUND FLOATING HEARTS */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: '110vh', opacity: 0 }}
            animate={{ y: '-10vh', opacity: [0, 0.8, 0] }}
            transition={{ duration: Math.random() * 7 + 5, repeat: Infinity, delay: heart.delay, ease: "linear" }}
            style={{ left: `${heart.left}%`, position: 'absolute', fontSize: Math.random() * 20 + 20 + 'px' }}
            className="text-pink-100/40 drop-shadow-lg"
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        {yesPressed ? (
          // --- TAMPILAN SETELAH DITERIMA ---
          <motion.div 
            key="success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative z-20 p-8 md:p-12 bg-white/40 backdrop-blur-xl border-2 border-white/60 rounded-[2rem] shadow-2xl max-w-2xl w-full text-left"
          >
            <motion.img 
              src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
              alt="Kiss" 
              className="w-40 h-40 mx-auto rounded-2xl shadow-lg mb-8 mix-blend-multiply object-cover"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            
            <motion.h1 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-pink-700 drop-shadow-sm mb-6 text-center"
            >
              Yeayyy! I'm so happy! 🥰
            </motion.h1>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-gray-800 text-base md:text-lg font-medium leading-relaxed tracking-wide bg-white/30 p-6 rounded-xl shadow-inner border border-white/40"
              style={{ whiteSpace: 'pre-line' }}
            >
              {messageChars.map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block ml-1 w-0.5 h-5 bg-pink-600 align-middle"
              />
            </motion.div>
          </motion.div>
        ) : (
          // --- TAMPILAN PERTANYAAN ---
          <motion.div 
            key="question"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.3 } }}
            className="relative z-20 p-8 md:p-10 bg-white/30 backdrop-blur-lg border-2 border-white/50 rounded-[2rem] shadow-2xl mx-4 max-w-md text-center w-full"
          >
            <img 
              src="https://media.tenor.com/K2sE9Xh2sKQAAAAi/bear-love.gif" 
              alt="Cute bear" 
              className="w-44 h-44 mx-auto mb-6 drop-shadow-2xl filter saturate-110"
            />
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] mb-10 leading-snug">
              Will you be my Valentine? 🥺
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-5 relative min-h-[140px] md:min-h-0">
              {/* TOMBOL YES (Hijau Segar) */}
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgb(34 197 94 / 50%)" }}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold rounded-full shadow-xl border-2 border-white/40 text-lg tracking-wider hover:brightness-110"
                onClick={handleYesClick}
              >
                MAU DONG! 😍
              </motion.button>

              {/* TOMBOL NO (MERAH JELAS) */}
              <motion.button
                onHoverStart={moveNoButton}
                onTouchStart={moveNoButton}
                animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-full md:w-auto px-10 py-4 bg-rose-500 text-white font-bold rounded-full shadow-xl border-2 border-rose-300 hover:bg-rose-600 hover:shadow-red-500/50 transition-all text-lg"
              >
                Gak dulu deh
              </motion.button>
            </div>
            
            <p className="mt-8 text-white/80 text-sm font-semibold drop-shadow-md">
              *Tombol merah agak licin ya... 🤭
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}