import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import useMapStore from '@/stores/map-store';
import { Workout } from '@/stores/workout-store';

type WorkoutCardProps = {
	workout: Workout;
};

export function WorkoutCard({ workout }: WorkoutCardProps) {
	const map = useMapStore((state) => state.map);

	return (
		<Card
			className='border-l-brand border-l-4 hover:border-brand transition cursor-pointer'
			onClick={() => {
				map?.flyTo(workout.coords, map.getZoom());
			}}
		>
			<CardHeader>
				<CardTitle>
					{workout.type.replace(workout.type[0], workout.type[0].toUpperCase())}
				</CardTitle>
				<CardDescription>
					{new Date(workout.date).toLocaleString()}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-2 gap-y-1'>
					<div className='grid grid-cols-2'>
						<div className='font-medium'>🏃‍♂️ Distance</div>
						<div className='text-muted-foreground'>{workout.distance} km</div>
					</div>
					<div className='grid grid-cols-2'>
						<div className='font-medium'>↕️ Cadence</div>
						<div className='text-muted-foreground'>{workout.cadence}</div>
					</div>
					<div className='grid grid-cols-2'>
						<div className='font-medium'>⌚ Duration</div>
						<div className='text-muted-foreground'>{workout.duration} min</div>
					</div>
					<div className='grid grid-cols-2'>
						<div className='font-medium'>⌚ Speed</div>
						<div className='text-muted-foreground'>{workout.speed} min/km</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
