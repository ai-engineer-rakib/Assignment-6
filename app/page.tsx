"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Clock, Flame, Star, ChevronDown, Dumbbell } from "lucide-react";
import { Workout } from "@/context/WorkoutContext";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"Duration" | "Calories" | "Rating">("Duration");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch workouts:", err);
        setLoading(false);
      });
  }, []);

  const parseNumber = (val: any) => {
    if (typeof val === "number") return val;
    return parseFloat(String(val).replace(/[^0-9.]/g, "")) || 0;
  };

  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "Duration") return parseNumber(b.duration) - parseNumber(a.duration);
      if (sortBy === "Calories") return parseNumber(b.calories) - parseNumber(a.calories);
      if (sortBy === "Rating") return parseNumber(b.rating) - parseNumber(a.rating);
      return 0;
    });
  }, [workouts, sortBy]);

  return (
    <div>
      {/* 2. Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-[#101217] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#ccff00] bg-[#ccff00]/10 px-3 py-1 rounded">
              WORKOUT LIBRARY
            </span>
            <h1 className="mt-4 text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-display leading-tight">
              TRAIN WITH INTENT. <br /> LOG EVERY SET.
            </h1>
            <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-lg leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>
            <a
              href="#library"
              className="mt-8 inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold uppercase tracking-wider px-6 py-3 rounded hover:bg-white transition-colors"
            >
              <span>BROWSE WORKOUTS</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>

          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
              alt="Gym training banner"
              className="object-cover w-full h-full opacity-80"
            />
          </div>
        </div>
      </section>

      {/* 3. The Library Section */}
      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white uppercase font-display">
              THE LIBRARY
            </h2>
            <p className="text-gray-400 text-sm mt-1">Twelve lifts covering every major muscle group.</p>
          </div>

          {/* C1. Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase text-gray-500 font-bold">Sort By:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#13151b] border border-gray-700 text-xs font-semibold text-white pl-3 pr-8 py-2 rounded focus:outline-none focus:border-[#ccff00] cursor-pointer"
              >
                <option value="Duration">Duration</option>
                <option value="Calories">Calories</option>
                <option value="Rating">Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
            <div className="w-10 h-10 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium tracking-wide">Loading exercises...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedWorkouts.map((item) => {
              const id = item._id || item.id;
              const categories = Array.isArray(item.category)
                ? item.category
                : (item.category || "").split(",").map((c) => c.trim()).filter(Boolean);

              return (
                <Link
                  key={id}
                  href={`/workout/${id}`}
                  className="group bg-[#13151b] border border-gray-800 rounded-xl overflow-hidden hover:border-[#ccff00]/60 transition-all flex flex-col"
                >
                  <div className="relative h-48 w-full bg-gray-900 overflow-hidden">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category tag pills */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {categories.map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-bold uppercase tracking-wider bg-gray-800 text-gray-300 px-2 py-0.5 rounded"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Workout Name */}
                      <h3 className="font-extrabold text-base uppercase text-white group-hover:text-[#ccff00] transition-colors leading-tight">
                        {item.name}
                      </h3>

                      {/* Equipment */}
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <Dumbbell className="w-3 h-3 text-gray-500" />
                        <span>{item.equipment}</span>
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className="mt-5 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                        {item.duration} {typeof item.duration === "number" && "min"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-orange-400" />
                        {item.calories} {typeof item.calories === "number" && "kcal"}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-white">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}