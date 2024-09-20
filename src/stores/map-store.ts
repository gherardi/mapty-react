import { create } from 'zustand';
import type { Map } from 'leaflet';

type MapStore = {
	map: Map | null;
	zoom: number;
	scrollWheelZoom: boolean;
	setMap: (map: Map) => void;
};

const useMapStore = create<MapStore>((set) => ({
	map: null,
	zoom: 15,
	scrollWheelZoom: true,
	setMap: (map: Map) => set({ map }),
}));

export default useMapStore;
