"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface Workout {
  _id?: string;
  id: string | number;
  name: string;
  description?: string;
  image: string;
  category: string[] | string;
  equipment: string;
  duration: number | string; // e.g. 25 or "25 min"
  calories: number | string; // e.g. 180 or "180 kcal"
  rating: number | string;
  difficulty?: string;
  sets?: number | string;
  reps?: string;
  instructions?: string[];
  isCompleted?: boolean;
}

interface WorkoutContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  markAsDone: (id: string | number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch (e) {
      console.error(e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    }
  }, [plan, saved, isLoaded]);

  const addToPlan = (workout: Workout) => {
    const workoutId = workout._id || workout.id;
    if (plan.some((item) => (item._id || item.id) === workoutId)) {
      toast.error("Already added to today's plan!");
      return;
    }
    if (plan.length >= 5) {
      toast.error("Cap reached! Finish your 5 lifts before adding more.");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, isCompleted: false }]);
    toast.success("Added to today's plan");
  };

  const saveForLater = (workout: Workout) => {
    const workoutId = workout._id || workout.id;
    if (saved.some((item) => (item._id || item.id) === workoutId)) {
      toast.error("Already in saved workouts!");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: string | number) => {
    setPlan((prev) => prev.filter((item) => (item._id || item.id) !== id));
    toast.success("Removed from plan");
  };

  const removeFromSaved = (id: string | number) => {
    setSaved((prev) => prev.filter((item) => (item._id || item.id) !== id));
    toast.success("Removed from saved list");
  };

  const markAsDone = (id: string | number) => {
    setPlan((prev) =>
      prev.map((item) =>
        (item._id || item.id) === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
    toast.success("Workout status updated!");
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkout must be used within WorkoutProvider");
  return context;
}