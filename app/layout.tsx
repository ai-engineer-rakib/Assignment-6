import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "FitLog — Workout Library & Routine Planner",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} bg-[#0b0c10]`}>
      <body className="bg-[#0b0c10] text-gray-100 flex flex-col min-h-screen antialiased selection:bg-[#ccff00] selection:text-black">
        <WorkoutProvider>
          <Toaster position="top-right" toastOptions={{ style: { background: "#1c1f26", color: "#fff", border: "1px solid #333" } }} />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}