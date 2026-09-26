"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Clock, Flame, Star, Dumbbell, ExternalLink } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } = useWorkout();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const currentList = activeTab === "plan" ? plan : saved;

  const parseNumber = (val: any) => {
    if (typeof val === "number") return val;
    return parseFloat(String(val).replace(/[^0-9.]/g, "")) || 0;
  };

  // Metrics for Today's Plan
  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((sum, item) => sum + parseNumber(item.duration), 0);
  const totalCalories = plan.reduce((sum, item) => sum + parseNumber(item.calories), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase text-white font-display tracking-tight">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (3 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <div className="bg-[#13151b] border border-gray-800 rounded-xl p-5">
          <p className="text-xs uppercase text-gray-400 font-bold">Exercises</p>
          <p className="text-3xl font-black text-white mt-1">{totalExercises} <span className="text-sm font-normal text-gray-500">/ 5</span></p>
        </div>
        <div className="bg-[#13151b] border border-gray-800 rounded-xl p-5">
          <p className="text-xs uppercase text-gray-400 font-bold">Minutes</p>
          <p className="text-3xl font-black text-[#ccff00] mt-1">{totalMinutes}</p>
        </div>
        <div className="bg-[#13151b] border border-gray-800 rounded-xl p-5">
          <p className="text-xs uppercase text-gray-400 font-bold">Calories</p>
          <p className="text-3xl font-black text-orange-400 mt-1">{totalCalories} <span className="text-sm font-normal text-gray-500">kcal</span></p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 mb-8 gap-4">
        <button
          onClick={() => setActiveTab("plan")}
          className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors ${
            activeTab === "plan"
              ? "text-[#ccff00] border-b-2 border-[#ccff00]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Today's Plan ({plan.length})
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors ${
            activeTab === "saved"
              ? "text-[#ccff00] border-b-2 border-[#ccff00]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Saved ({saved.length})
        </button>
      </div>

      {/* Workout Cards List / Empty State */}
      {currentList.length === 0 ? (
        <div className="bg-[#13151b] border border-gray-800 rounded-2xl py-16 px-4 text-center max-w-lg mx-auto my-8">
          <h3 className="text-xl font-black text-white uppercase font-display">NOTHING HERE YET</h3>
          <p className="text-gray-400 text-sm mt-2">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block bg-[#ccff00] text-black font-extrabold uppercase px-6 py-2.5 rounded text-xs hover:opacity-90"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((item) => {
            const id = item._id || item.id;
            return (
              <div
                key={id}
                className={`bg-[#13151b] border rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${
                  item.isCompleted ? "border-green-500/40 opacity-75" : "border-gray-800"
                }`}
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div>
                    <h4 className={`font-black text-base uppercase text-white ${item.isCompleted ? "line-through text-gray-400" : ""}`}>
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Dumbbell className="w-3 h-3 text-gray-500" />
                      {item.equipment}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#ccff00]" /> {item.duration} {typeof item.duration === "number" && "min"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-400" /> {item.calories} {typeof item.calories === "number" && "kcal"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {item.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <Link
                    href={`/workout/${id}`}
                    className="text-xs border border-gray-700 bg-gray-800 text-gray-200 px-3 py-2 rounded font-bold uppercase hover:border-gray-500 flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(id)}
                      className={`text-xs px-3 py-2 rounded font-bold uppercase flex items-center gap-1 transition-colors ${
                        item.isCompleted
                          ? "bg-green-600 text-white"
                          : "border border-gray-700 text-gray-300 hover:border-green-500 hover:text-green-400"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {item.isCompleted ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() => (activeTab === "plan" ? removeFromPlan(id) : removeFromSaved(id))}
                    className="text-xs border border-red-900/50 bg-red-950/20 text-red-400 p-2 rounded hover:bg-red-900/40 transition-colors"
                    title="Remove workout"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}