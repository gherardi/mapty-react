import useWorkoutStore from '@/stores/workout-store';
import { Marker, Popup } from 'react-leaflet';

export function MapMarkersHandler() {
	const workouts = useWorkoutStore((state) => state.workouts);

	return (
		<>
			{workouts.map((workout) => {
				return (
					<Marker position={workout.coords}>
						<Popup>
							<p className='font-medium !mb-1'>
								{workout.type.replace(
									workout.type[0],
									workout.type[0].toUpperCase()
								)}
							</p>
							<code>{new Date(workout.date).toLocaleString()}</code>
						</Popup>
					</Marker>
				);
			})}
		</>
	);
}
