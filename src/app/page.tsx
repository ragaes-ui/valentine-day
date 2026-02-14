'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  // Kata-kata lucu kalau dia coba klik No
  const phrases = [
    "No",
    "Yakin nih?",
    "Beneran gamau?",
    "Coba pikir lagi deh..",
    "Jahat banget sih :(",
    "Aku nangis nih...",
    "Bercanda kan?",
    "Pleaseee...",
    "I'm gonna die...",
    "Yep, I'm dead.",
    "Ok, kamu menang.",
    "TAPI BOHONG, AYO KLIK YES!",
  ];

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // --- PERBAIKAN DI SINI (LEBIH RINGAN) ---
  const handleYesClick = () => {
    setYesPressed(true);
    
    // Tembakan Konfeti Simpel (Hemat Memori)
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
    
    // Tembak dari kiri
    confetti({
      ...defaults,
      particleCount: 80,
      origin: { x: 0, y: 0.8 } // Pojok kiri bawah
    });

    // Tembak dari kanan
    confetti({
      ...defaults,
      particleCount: 80,
      origin: { x: 1, y: 0.8 } // Pojok kanan bawah
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 px-4 text-center overflow-hidden py-12">
      {yesPressed ? (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 max-w-xl mx-auto bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-pink-100"
        >
          {/* Gambar GIF (Gunakan img biasa agar ringan) */}
          <img 
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
            alt="Bears kissing" 
            className="w-48 h-48 md:w-64 md:h-64 object-cover mx-auto rounded-2xl shadow-md"
            loading="lazy" // Lazy load biar ringan
          />
          
          <h1 className="text-3xl md:text-5xl font-bold text-pink-600 leading-tight">
            Happy Valentine! ❤️
          </h1>

          <div className="text-lg text-gray-700 font-medium leading-relaxed space-y-4 text-left md:text-center px-2">
            <p>
              Makasih ya udah sabar nemenin aku, bahkan saat aku sibuk sama laptop, tugas kuliah, atau kerjaan yang sering banget nggak ada habisnya.
            </p>
            <p>
              Kamu adalah <i>support system</i> terbaik yang pernah aku punya. Semua kerja kerasku ini tujuannya cuma satu: bangun masa depan yang lebih baik bareng kamu.
            </p>
            <p className="font-bold text-pink-500 text-2xl pt-4 text-center">
              I love you! 🌹
            </p>
          </div>

          <div className="pt-6">
            <Link href="/" className="inline-block px-8 py-3 bg-pink-500 text-white rounded-full font-bold shadow-md hover:bg-pink-600 transition transform hover:-translate-y-1">
              Kembali ke Home
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 relative z-10"
        >
          <img 
            src="https://media.tenor.com/K2sE9Xh2sKQAAAAi/bear-love.gif" 
            alt="Cute bear" 
            className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-2xl"
            loading="eager" // Load duluan biar ga patah-patah
          />
          
          <h1 className="text-3xl md:text-5xl font-bold text-pink-600 leading-tight drop-shadow-sm">
            Will you be my Valentine? 🌹
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-md transition-all duration-300"
              // Batasi ukuran maksimal tombol agar tidak membuat layout 'pecah' di layar kecil
              style={{ 
                fontSize: Math.min(noCount * 2 + 16, 24), 
                padding: `${Math.min(noCount + 16, 20)}px ${Math.min(noCount * 2 + 32, 40)}px` 
              }}
              onClick={handleYesClick}
            >
              YES! 
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNoCount(noCount + 1)}
              className="px-8 py-4 bg-red-400 hover:bg-red-500 text-white font-bold rounded-xl shadow-md transition-all"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
