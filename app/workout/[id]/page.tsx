"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Bookmark, Clock, Flame, Star, Dumbbell, ShieldAlert, ArrowLeft } from "lucide-react";
import { useWorkout, Workout } from "@/context/WorkoutContext";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToPlan, saveForLater } = useWorkout();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data.data || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-400 gap-3">
        <div className="w-10 h-10 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm">Loading workout details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-400 gap-4">
        <p className="text-xl font-bold text-white">Workout not found.</p>
        <button
          onClick={() => router.push("/")}
          className="text-xs bg-gray-800 text-white px-4 py-2 rounded uppercase font-bold"
        >
          Return to Library
        </button>
      </div>
    );
  }

  const categories = Array.isArray(workout.category)
    ? workout.category
    : (workout.category || "").split(",").map((c) => c.trim()).filter(Boolean);

  const instructions = workout.instructions && workout.instructions.length > 0
    ? workout.instructions
    : [
        "Set up in position with a solid base and locked core.",
        "Execute the movement with steady control through full range of motion.",
        "Maintain breath cadence: inhale on eccentric, exhale on concentric.",
        "Lock out cleanly at the peak and lower under complete control.",
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side: Media */}
        <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 h-[380px] lg:h-[580px] relative">
          <img
            src={workout.image || "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"}
            alt={workout.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Details */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="text-xs font-bold uppercase tracking-wider bg-gray-800 text-[#ccff00] px-2.5 py-1 rounded"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black uppercase text-white font-display tracking-tight">
              {workout.name}
            </h1>

            <p className="mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
              {workout.description ||
                "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
            </p>

            {/* Key Specs Table/Panel */}
            <div className="mt-6 bg-[#13151b] border border-gray-800 rounded-xl p-4 divide-y divide-gray-800/60 text-xs">
              <div className="py-2 flex justify-between">
                <span className="text-gray-400 font-bold uppercase">EQUIPMENT</span>
                <span className="text-white font-semibold">{workout.equipment || "Standard Gear"}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-400 font-bold uppercase">DIFFICULTY</span>
                <span className="text-white font-semibold">{workout.difficulty || "Intermediate"}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-400 font-bold uppercase">SETS</span>
                <span className="text-white font-semibold">{workout.sets || "4"}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-400 font-bold uppercase">REPS</span>
                <span className="text-white font-semibold">{workout.reps || "8-12"}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-400 font-bold uppercase">DURATION</span>
                <span className="text-white font-semibold">{workout.duration} {typeof workout.duration === 'number' && 'min'}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-400 font-bold uppercase">CALORIES</span>
                <span className="text-white font-semibold">{workout.calories} {typeof workout.calories === 'number' && 'kcal'}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-400 font-bold uppercase">RATING</span>
                <span className="text-[#ccff00] font-semibold">{workout.rating} / 5.0</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-gray-400 mb-3">
                INSTRUCTIONS
              </h3>
              <ol className="space-y-2">
                {instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-800 text-[#ccff00] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-800">
            <button
              onClick={() => addToPlan(workout)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#ccff00] text-black font-extrabold uppercase px-6 py-3 rounded text-sm hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Add to today's plan
            </button>
            <button
              onClick={() => saveForLater(workout)}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-700 bg-[#13151b] text-white font-bold uppercase px-6 py-3 rounded text-sm hover:border-[#ccff00] transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}