import React from 'react';

export const metadata = {
  title: 'Special Question... 🫣',
  description: 'Ada pesan buat kamu!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        {/* Mengambil Tailwind & Font Google (Poppins) biar modern */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'Poppins', sans-serif; }
          /* Animasi Background Bergerak */
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 300%;
            animation: gradient 15s ease infinite;
          }
        `}</style>
      </head>
      <body className="antialiased overflow-hidden">
        {children}
      </body>
    </html>
  )
}