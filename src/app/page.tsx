'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  
  // State untuk teks yang sedang diketik
  const [displayedText1, setDisplayedText1] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const [displayedText3, setDisplayedText3] = useState('');
  const [displayedText4, setDisplayedText4] = useState('');
  
  // State penanda status (Biar gak macet lagi)
  const [step, setStep] = useState(0); // 0: Start, 1: Para 1 Done, 2: Para 2 Done...
  const [showButton, setShowButton] = useState(false);

  // --- PESAN ROMANTIS ---
  const messages = [
    "Hai sayang, Happy Valentine's Day! ❤️ Maaf ya kalau belakangan ini aku sering sibuk sendiri. Antara deadline project, tugas kuliah UT yang numpuk, atau aku yang kadang pusing ngurusin error kodingan.",
    "Tapi aku mau kamu tau satu hal: Di setiap detik aku fokus depan laptop, dan di setiap lelah yang aku rasain, nama kamu selalu jadi alasan kenapa aku nggak mau nyerah.",
    "Makasih udah jadi wanita paling sabar. Makasih udah mau ngertiin kesibukanku dan tetep nemenin aku berjuang dari nol. Kamu itu 'rumah' tempat aku pulang pas duniaku lagi capek-capeknya.",
    "Semua kerja kerasku ini—tiap baris kode yang aku tulis—semuanya cuma buat satu tujuan: Ngebangun masa depan yang indah bareng kamu. I love you, selamanya. 🌹"
  ];

  // Ref untuk auto-scroll
  const textEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    textEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayedText1, displayedText2, displayedText3, displayedText4]);

  // LOGIKA BARU (Menggunakan Async/Await biar lebih stabil)
  useEffect(() => {
    if (yesPressed) {
      const typeWriter = async () => {
        const speed = 30; // Kecepatan ngetik

        // Fungsi ngetik satu paragraf
        const typeParagraph = async (text: string, setText: Function) => {
          for (let i = 0; i <= text.length; i++) {
            setText(text.slice(0, i));
            await new Promise((resolve) => setTimeout(resolve, speed));
          }
        };

        // Mulai Paragraf 1
        await typeParagraph(messages[0], setDisplayedText1);
        setStep(1); // Tandai paragraf 1 selesai (apapun yang terjadi)
        await new Promise(r => setTimeout(r, 500)); // Jeda dikit

        // Mulai Paragraf 2
        await typeParagraph(messages[1], setDisplayedText2);
        setStep(2);
        await new Promise(r => setTimeout(r, 500));

        // Mulai Paragraf 3
        await typeParagraph(messages[2], setDisplayedText3);
        setStep(3);
        await new Promise(r => setTimeout(r, 500));

        // Mulai Paragraf 4
        await typeParagraph(messages[3], setDisplayedText4);
        setStep(4);
        
        // Munculin Tombol
        setShowButton(true);
      };

      typeWriter();
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
          className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl border border-pink-200 overflow-y-auto max-h-[85vh]"
        >
          <img 
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
            alt="Bears kissing" 
            className="w-32 h-32 md:w-48 md:h-48 object-cover mx-auto rounded-2xl shadow-md mb-6"
          />
          
          <div className="text-left text-gray-800 text-sm md:text-base font-medium leading-relaxed space-y-4 pb-4">
            
            {/* Paragraf 1 (Pink) */}
            <div className="p-4 bg-pink-100 rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm">
              <p>{displayedText1}</p>
            </div>
            
            {/* Paragraf 2 (Biru - Kanan) - Muncul kalau step >= 1 */}
            {step >= 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-blue-100 rounded-tl-xl rounded-br-xl rounded-bl-xl text-right ml-auto shadow-sm w-fit max-w-[90%]"
              >
                <p>{displayedText2}</p>
              </motion.div>
            )}

            {/* Paragraf 3 (Ungu - Kiri) - Muncul kalau step >= 2 */}
            {step >= 2 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-purple-100 rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm w-fit max-w-[90%]"
              >
                <p>{displayedText3}</p>
              </motion.div>
            )}

             {/* Paragraf 4 (Merah - Kanan) - Muncul kalau step >= 3 */}
             {step >= 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-100 rounded-tl-xl rounded-br-xl rounded-bl-xl text-right ml-auto border-2 border-red-200 shadow-sm w-fit max-w-[90%]"
              >
                <p className="font-semibold text-red-800">
                  {displayedText4}
                </p>
              </motion.div>
            )}
            
            {/* Div kosong buat scroll otomatis */}
            <div ref={textEndRef} />
          </div>

          {showButton && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4"
            >
              <Link href="/" className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                Kembali ke Home 🏠
              </Link>
            </motion.div>
          )}
        </motion.div>
      ) : (
        // --- TAMPILAN AWAL ---
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
