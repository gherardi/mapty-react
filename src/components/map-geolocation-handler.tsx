import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useToast } from '@/hooks/use-toast';
import useMapStore from '@/stores/map-store';
import useLocationStore, {
	UserGeoLocationStatus,
} from '@/stores/geo-location-store';

export function MapGeolocationHandler() {
	const map = useMap();
	const setMap = useMapStore((state) => state.setMap);

	const { toast } = useToast();

	useEffect(() => {
		setMap(map);

		const getLocation = () => {
			if (navigator.geolocation)
				navigator.geolocation.getCurrentPosition(
					function ({ coords }) {
						const { latitude, longitude } = coords;
						map.flyTo([latitude, longitude], map.getZoom());
						useLocationStore.setState({
							userCoords: [latitude, longitude],
							userLocationStatus: UserGeoLocationStatus.SUCCESS,
						});
					},
					function () {
						toast({
							title: 'Unable to get your location',
							description: 'Please allow location access to continue',
							variant: 'destructive',
						});
						useLocationStore.setState({
							userLocationStatus: UserGeoLocationStatus.ERROR,
						});
					}
				);
		};
		getLocation();
	}, [map, toast]);

	return null;
}
