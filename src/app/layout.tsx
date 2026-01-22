// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
      <html lang="ru">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
      <Navbar />
      <div className="flex-1">{children}</div>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>© 2025 Экскурсии по городу. Все права защищены.</p>
      </footer>
      </body>
      </html>
    );
}