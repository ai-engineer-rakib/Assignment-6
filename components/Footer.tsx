import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b0c10] border-t border-gray-900 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-black tracking-wider text-white">
          <Dumbbell className="text-[#ccff00] h-5 w-5" />
          <span>FITLOG</span>
        </div>
        <p className="text-xs text-gray-500 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}