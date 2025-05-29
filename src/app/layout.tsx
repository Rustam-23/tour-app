import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import React from "react";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <body className={inter.className}>
        <Navbar />
        {children}
        </body>
        </html>
    );
}