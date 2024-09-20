import { create } from 'zustand';

export enum UserGeoLocationStatus {
	FETCHING,
	SUCCESS,
	ERROR,
}

type Coordinates = [number, number];

type GeoLocationStore = {
	userCoords: Coordinates;
	workoutCoords: Coordinates | null;
	userLocationStatus: UserGeoLocationStatus;

	setUserCoords: (coords: Coordinates) => void;
	setWorkoutCoords: (coords: Coordinates | null) => void;
	setUserLocationStatus: (status: UserGeoLocationStatus) => void;
};

const MILAN_COORDINATES: Coordinates = [45.4636507, 9.1882373];

const useGeoLocationStore = create<GeoLocationStore>((set) => ({
	userCoords: MILAN_COORDINATES,
	workoutCoords: null,
	userLocationStatus: UserGeoLocationStatus.FETCHING,

	setUserCoords: (userCoords: Coordinates) => set({ userCoords }),
	setWorkoutCoords: (workoutCoords: Coordinates | null) =>
		set({ workoutCoords }),
	setUserLocationStatus: (userLocationStatus: UserGeoLocationStatus) =>
		set({ userLocationStatus }),
}));

export default useGeoLocationStore;
