"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  return (
    <header className="sticky top-0 z-50 bg-[#0b0c10]/95 backdrop-blur border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black tracking-wider text-xl">
          <Dumbbell className="text-[#ccff00] h-6 w-6" />
          <span>FIT<span className="text-[#ccff00]">LOG</span></span>
        </Link>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
              pathname === "/" ? "text-[#ccff00] border-b-2 border-[#ccff00] pb-1" : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
              pathname === "/my-plan" ? "text-[#ccff00] border-b-2 border-[#ccff00] pb-1" : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full hover:opacity-90 transition-opacity"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] px-1.5 py-0.2 rounded-full text-[10px]">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 border border-[#ccff00] text-[#ccff00] text-xs font-bold px-3 py-1 rounded-full hover:bg-[#ccff00]/10 transition-colors"
          >
            <span>Saved</span>
            <span className="bg-gray-800 text-white px-1.5 py-0.2 rounded-full text-[10px]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}