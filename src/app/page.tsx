'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  
  // State untuk efek mengetik
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [showButton, setShowButton] = useState(false);

  // Pesan lengkap
  const message1 = "Makasih ya udah sabar nemenin aku, bahkan saat aku sibuk sama laptop, tugas kuliah, atau kerjaan yang sering banget nggak ada habisnya.";
  const message2 = "Kamu adalah support system terbaik yang pernah aku punya. Semua kerja kerasku ini tujuannya cuma satu: bangun masa depan yang lebih baik bareng kamu.";

  // Efek Mengetik (Typewriter)
  useEffect(() => {
    if (yesPressed) {
      // Mulai ngetik paragraf 1
      let i = 0;
      const intervalId1 = setInterval(() => {
        if (i < message1.length) {
          setTypedText1((prev) => prev + message1.charAt(i));
          i++;
        } else {
          clearInterval(intervalId1);
          
          // Mulai ngetik paragraf 2 setelah paragraf 1 selesai
          let j = 0;
          const intervalId2 = setInterval(() => {
            if (j < message2.length) {
              setTypedText2((prev) => prev + message2.charAt(j));
              j++;
            } else {
              clearInterval(intervalId2);
              setShowButton(true); // Munculkan tombol Home setelah selesai
            }
          }, 50); // Kecepatan ngetik (makin kecil makin ngebut)
        }
      }, 50);

      return () => {
        clearInterval(intervalId1);
      };
    }
  }, [yesPressed]);

  // Kata-kata tombol No
  const phrases = [
    "No", "Yakin nih?", "Beneran gamau?", "Coba pikir lagi deh..",
    "Jahat banget sih :(", "Aku nangis nih...", "Bercanda kan?",
    "Pleaseee...", "Mati aku...", "Ok, kamu menang.",
    "TAPI BOHONG, AYO KLIK YES!",
  ];

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleYesClick = () => {
    setYesPressed(true);
    // Tembakan Konfeti (Sekali saja biar ringan)
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
    confetti({ ...defaults, particleCount: 80, origin: { x: 0, y: 0.8 } });
    confetti({ ...defaults, particleCount: 80, origin: { x: 1, y: 0.8 } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 px-4 text-center overflow-hidden py-12">
      {yesPressed ? (
        // --- TAMPILAN SETELAH DITERIMA ---
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-pink-200"
        >
          <img 
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
            alt="Bears kissing" 
            className="w-48 h-48 md:w-56 md:h-56 object-cover mx-auto rounded-2xl shadow-md"
          />
          
          <h1 className="text-3xl md:text-4xl font-bold text-pink-600">
            Happy Valentine! ❤️
          </h1>

          {/* AREA TEKS MENGETIK */}
          <div className="text-left text-gray-800 font-medium leading-relaxed space-y-4 min-h-[150px]">
            <p className="border-l-4 border-pink-400 pl-4">
              {typedText1}
              {/* Kursor kedap-kedip saat ngetik paragraf 1 */}
              {!typedText2 && <span className="animate-pulse text-pink-500">|</span>}
            </p>
            
            {typedText1.length >= message1.length && (
              <p className="border-l-4 border-blue-400 pl-4">
                {typedText2}
                {/* Kursor kedap-kedip saat ngetik paragraf 2 */}
                {!showButton && <span className="animate-pulse text-blue-500">|</span>}
              </p>
            )}
          </div>

          {showButton && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 space-y-4"
            >
              <p className="font-bold text-pink-500 text-2xl">
                I love you! 🌹
              </p>
              <Link href="/" className="inline-block px-8 py-3 bg-pink-500 text-white rounded-full font-bold shadow-md hover:bg-pink-600 transition hover:-translate-y-1">
                Kembali ke Home
              </Link>
            </motion.div>
          )}
        </motion.div>
      ) : (
        // --- TAMPILAN PERTANYAAN ---
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 relative z-10"
        >
          <img 
            src="https://media.tenor.com/K2sE9Xh2sKQAAAAi/bear-love.gif" 
            alt="Cute bear" 
            className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-2xl"
          />
          
          <h1 className="text-3xl md:text-5xl font-bold text-pink-600 leading-tight">
            Will you be my Valentine? 🌹
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-md transition-all duration-300"
              style={{ 
                fontSize: Math.min(noCount * 2 + 16, 24), 
                padding: `${Math.min(noCount + 16, 20)}px ${Math.min(noCount * 2 + 32, 40)}px` 
              }}
              onClick={handleYesClick}
            >
              YES! 
            </motion.button>

            <button
              onClick={() => setNoCount(noCount + 1)}
              className="px-8 py-4 bg-red-400 hover:bg-red-500 text-white font-bold rounded-xl shadow-md transition-all"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
