'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  
  // State untuk efek mengetik 3 Paragraf
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [typedText3, setTypedText3] = useState('');
  const [showButton, setShowButton] = useState(false);

  // --- PESAN PANJANG & ROMANTIS DI SINI ---
  const message1 = "Hai sayang, Happy Valentine! Maaf ya kalau akhir-akhir ini waktuku banyak tersita buat ngurusin kodingan error, tugas kuliah UT, atau project yang numpuk.";
  
  const message2 = "Tapi aku mau kamu tau, kamu itu alasan utama aku buat terus semangat. Di setiap baris kode yang aku tulis di laptop ini, terselip harapan besar buat ngebangun masa depan kita nanti.";
  
  const message3 = "Makasih udah jadi support system terbaik yang selalu sabar nemenin prosesku dari nol. Aku janji bakal terus berusaha keras buat bahagiain kamu. I love you! ❤️";

  // Logika Typing Effect (Berurutan 1 -> 2 -> 3)
  useEffect(() => {
    if (yesPressed) {
      // Kecepatan ngetik (ms). Semakin kecil semakin ngebut.
      const speed = 40; 

      // Mulai Paragraf 1
      let i = 0;
      const intervalId1 = setInterval(() => {
        if (i < message1.length) {
          setTypedText1((prev) => prev + message1.charAt(i));
          i++;
        } else {
          clearInterval(intervalId1);
          
          // Lanjut Paragraf 2
          let j = 0;
          const intervalId2 = setInterval(() => {
            if (j < message2.length) {
              setTypedText2((prev) => prev + message2.charAt(j));
              j++;
            } else {
              clearInterval(intervalId2);

              // Lanjut Paragraf 3
              let k = 0;
              const intervalId3 = setInterval(() => {
                if (k < message3.length) {
                  setTypedText3((prev) => prev + message3.charAt(k));
                  k++;
                } else {
                  clearInterval(intervalId3);
                  setShowButton(true); // Selesai semua, munculin tombol
                }
              }, speed);
            }
          }, speed);
        }
      }, speed);

      return () => {
        clearInterval(intervalId1);
      };
    }
  }, [yesPressed]);

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
          className="w-full max-w-2xl bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-pink-200"
        >
          <img 
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
            alt="Bears kissing" 
            className="w-40 h-40 md:w-52 md:h-52 object-cover mx-auto rounded-2xl shadow-md mb-6"
          />
          
          {/* AREA TEKS MENGETIK */}
          <div className="text-left text-gray-800 font-medium leading-relaxed space-y-6 min-h-[200px]">
            {/* Paragraf 1 */}
            <div className="border-l-4 border-pink-400 pl-4 bg-pink-50/50 p-2 rounded-r-lg">
              <p>{typedText1}</p>
            </div>
            
            {/* Paragraf 2 */}
            {typedText1.length >= message1.length && (
              <div className="border-l-4 border-blue-400 pl-4 bg-blue-50/50 p-2 rounded-r-lg">
                <p>{typedText2}</p>
              </div>
            )}

            {/* Paragraf 3 */}
            {typedText2.length >= message2.length && (
              <div className="border-l-4 border-purple-400 pl-4 bg-purple-50/50 p-2 rounded-r-lg">
                <p className="font-semibold text-gray-900">
                  {typedText3}
                  {!showButton && <span className="animate-pulse text-purple-500">|</span>}
                </p>
              </div>
            )}
          </div>

          {showButton && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-8"
            >
              <Link href="/" className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                Kembali ke Home 🏠
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
