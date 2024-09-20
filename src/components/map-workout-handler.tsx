import { useMapEvents } from 'react-leaflet';
import useLocationStore from '@/stores/geo-location-store';

export function MapWorkoutHandler({
	setOpen,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const setWorkoutCoords = useLocationStore((state) => state.setWorkoutCoords);
	useMapEvents({
		click({ latlng }) {
			setWorkoutCoords([latlng.lat, latlng.lng]);
			setOpen(true);
		},
	});
	return null;
}
