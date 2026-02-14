'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  
  // State untuk efek mengetik
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [typedText3, setTypedText3] = useState('');
  const [typedText4, setTypedText4] = useState(''); // Tambah paragraf ke-4
  const [showButton, setShowButton] = useState(false);

  // --- PESAN CINTA (PANJANG & ROMANTIS) ---
  const message1 = "Hai sayang, Happy Valentine's Day! ❤️ Maaf ya kalau belakangan ini aku sering sibuk sendiri. Antara deadline project, tugas kuliah UT yang numpuk, atau aku yang kadang pusing ngurusin error kodingan.";
  
  const message2 = "Tapi aku mau kamu tau satu hal: Di setiap detik aku fokus depan laptop, dan di setiap lelah yang aku rasain, nama kamu selalu jadi alasan kenapa aku nggak mau nyerah.";
  
  const message3 = "Makasih udah jadi wanita paling sabar. Makasih udah mau ngertiin kesibukanku dan tetep nemenin aku berjuang dari nol. Kamu itu 'rumah' tempat aku pulang pas duniaku lagi capek-capeknya.";
  
  const message4 = "Semua kerja kerasku ini—tiap baris kode yang aku tulis—semuanya cuma buat satu tujuan: Ngebangun masa depan yang indah bareng kamu. I love you, selamanya. 🌹";

  // Ref untuk scroll otomatis ke bawah saat ngetik
  const textEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    textEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [typedText1, typedText2, typedText3, typedText4]);

  // Logika Typing Effect
  useEffect(() => {
    if (yesPressed) {
      const speed = 35; // Kecepatan ngetik (ms)

      let i = 0;
      const intervalId1 = setInterval(() => {
        if (i < message1.length) {
          setTypedText1((prev) => prev + message1.charAt(i));
          i++;
        } else {
          clearInterval(intervalId1);
          
          let j = 0;
          const intervalId2 = setInterval(() => {
            if (j < message2.length) {
              setTypedText2((prev) => prev + message2.charAt(j));
              j++;
            } else {
              clearInterval(intervalId2);

              let k = 0;
              const intervalId3 = setInterval(() => {
                if (k < message3.length) {
                  setTypedText3((prev) => prev + message3.charAt(k));
                  k++;
                } else {
                  clearInterval(intervalId3);
                  
                  let l = 0;
                  const intervalId4 = setInterval(() => {
                    if (l < message4.length) {
                      setTypedText4((prev) => prev + message4.charAt(l));
                      l++;
                    } else {
                      clearInterval(intervalId4);
                      setShowButton(true);
                    }
                  }, speed);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 px-4 text-center overflow-hidden py-8">
      {yesPressed ? (
        // --- TAMPILAN SETELAH DITERIMA ---
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl border border-pink-200 overflow-y-auto max-h-[90vh]"
        >
          <img 
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
            alt="Bears kissing" 
            className="w-32 h-32 md:w-48 md:h-48 object-cover mx-auto rounded-2xl shadow-md mb-6"
          />
          
          {/* AREA TEKS MENGETIK */}
          <div className="text-left text-gray-800 text-sm md:text-base font-medium leading-relaxed space-y-4">
            
            {/* Paragraf 1 */}
            <div className="p-3 bg-pink-100 rounded-tr-xl rounded-bl-xl rounded-br-xl">
              <p>{typedText1}</p>
            </div>
            
            {/* Paragraf 2 */}
            {typedText1.length >= message1.length && (
              <div className="p-3 bg-blue-100 rounded-tl-xl rounded-br-xl rounded-bl-xl text-right ml-auto">
                <p>{typedText2}</p>
              </div>
            )}

            {/* Paragraf 3 */}
            {typedText2.length >= message2.length && (
              <div className="p-3 bg-purple-100 rounded-tr-xl rounded-bl-xl rounded-br-xl">
                <p>{typedText3}</p>
              </div>
            )}

             {/* Paragraf 4 */}
             {typedText3.length >= message3.length && (
              <div className="p-3 bg-red-100 rounded-tl-xl rounded-br-xl rounded-bl-xl text-right ml-auto border-2 border-red-200">
                <p className="font-semibold text-red-800">
                  {typedText4}
                  {!showButton && <span className="animate-pulse">|</span>}
                </p>
              </div>
            )}
            
            {/* Invisible div buat auto scroll */}
            <div ref={textEndRef} />
          </div>

          {showButton && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-8 pb-4"
            >
              <Link href="/" className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
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
            className="w-40 h-40 md:w-52 md:h-52 mx-auto rounded-2xl"
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
