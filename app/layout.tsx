import type { Metadata } from "next";
import { ThemeModeScript } from "flowbite-react";
import Navbar from "./components/Header";
import Footer from "./components/Footerr"
import "./globals.css";

export const metadata: Metadata = {
  title: "Auto Car Dealers",
  description: "Make Deals Of Cars And Any Other Vehical",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className="dark:bg-gray-800 dark:text-gray-200">
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
