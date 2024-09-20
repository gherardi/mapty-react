import { create } from 'zustand';

export type Workout = {
	id: string;
	coords: [number, number];
	type: 'running' | 'cycling';
	date: string;
	duration: number;
	distance: number;
	cadence?: number | undefined;
	elevation?: number | undefined;
	speed: number;
};

interface WorkoutStore {
	workouts: Workout[];
	addWorkout: (workout: Workout) => void;
	reset: () => void;
}

const useWorkoutStore = create<WorkoutStore>((set) => ({
	workouts: [],
	addWorkout: (workout: Workout) =>
		set((state) => ({ workouts: [...state.workouts, workout] })),
	reset: () => set({ workouts: [] }),
}));

export default useWorkoutStore;
