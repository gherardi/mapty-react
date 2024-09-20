import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { MapGeolocationHandler } from '@/components/map-geolocation-handler';
import { MapWorkoutHandler } from '@/components/map-workout-handler';
import { WorkoutForm } from '@/components/workout-form';
import { MapMarkersHandler } from '@/components/map-markers-handler';
import useMapStore from '@/stores/map-store';
import useLocationStore from '@/stores/geo-location-store';

export function Map() {
	const [open, setOpen] = useState(false);
	const zoom = useMapStore((state) => state.zoom);
	const scrollWheelZoom = useMapStore((state) => state.scrollWheelZoom);
	const userCoords = useLocationStore((state) => state.userCoords);

	return (
		<div id='map' className='h-full col-span-2 p-8 z-0'>
			<MapContainer
				center={userCoords}
				zoom={zoom}
				scrollWheelZoom={scrollWheelZoom}
				className='h-full rounded-2xl'
			>
				<TileLayer
					attribution='&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<MapGeolocationHandler />
				<MapWorkoutHandler setOpen={setOpen} />
				<MapMarkersHandler />
			</MapContainer>

			<WorkoutForm open={open} setOpen={setOpen} />
		</div>
	);
}
