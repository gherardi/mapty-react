import { SidebarHeader } from '@/components/sidebar-header';
import { WorkoutCard } from '@/components/workout-card';
import { SidebarFooter } from '@/components/sidebar-footer';
import useWorkoutStore from '@/stores/workout-store';

export function Sidebar() {
	const workouts = useWorkoutStore((state) => state.workouts);

	return (
		<div className='h-svh p-8 pt-12 flex flex-col bg-muted/40'>
			<SidebarHeader />

			<div className='mt-8 flex-grow overflow-y-auto space-y-5 border-b'>
				{workouts
					.sort(
						(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
					)
					.map((workout) => (
						<WorkoutCard workout={workout} key={workout.id} />
					))}
			</div>

			<SidebarFooter />
		</div>
	);
}
