import "./globals.css";
import Navbar from "../components/navbar"
import Footer from "../components/footer"

import "leaflet/dist/leaflet.css";

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: "AtmoEye",
    description: "AtmoEye is an AI-driven application designed to provide users with a fast and efficient way to diagnose potential eye conditions using self-taken images.",
    icons: {
      icon: "/logo.png",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/logo.png" />
        <title>Atmo Eye</title>
      </head>
      <body className="min-w-screen min-h-screen h-auto">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
