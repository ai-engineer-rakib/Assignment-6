import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Dumbbell className="w-16 h-16 text-[#ccff00] mb-4 animate-bounce" />
      <h1 className="text-6xl font-black text-white font-display">404</h1>
      <h2 className="text-xl font-bold uppercase text-gray-300 mt-2">PAGE NOT FOUND</h2>
      <p className="text-sm text-gray-500 mt-1 max-w-sm">
        The lift you are searching for does not exist in this library.
      </p>
      <Link
        href="/"
        className="mt-6 bg-[#ccff00] text-black font-extrabold uppercase text-xs px-6 py-3 rounded hover:opacity-90 transition-opacity"
      >
        Back to Library
      </Link>
    </div>
  );
}