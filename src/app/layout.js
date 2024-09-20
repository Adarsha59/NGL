// Keep this, but remove metadata

import localFont from "next/font/local";
import "./globals.css";
import toast, { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import SkyNavbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SkyNavbar />
          {children}
          <Toaster />
          <Footer />
        </body>
      </SessionProvider>
    </html>
  );
}
