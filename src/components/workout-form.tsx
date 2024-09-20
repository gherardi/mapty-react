import {
	AlertDialog,
	AlertDialogTitle,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
} from '@/components/ui/alert-dialog';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useWorkoutStore, { type Workout } from '@/stores/workout-store';
import useGeoLocationStore from '@/stores/geo-location-store';

const workoutSchema = z.object({
	type: z.enum(['running', 'cycling'], {
		message: 'Workout type is required',
	}),
	duration: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
		message: 'Duration must be a positive number',
	}),
	distance: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
		message: 'Distance must be a positive number',
	}),
	cadence: z
		.string()
		.optional()
		.refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
			message: 'Cadence must be a positive number',
		}),
	elevation: z
		.string()
		.optional()
		.refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
			message: 'Elevation must be a positive number',
		}),
});

type WorkoutFormProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	coords?: [number, number];
};

export function WorkoutForm({ open, setOpen }: WorkoutFormProps) {
	const addWorkout = useWorkoutStore((state) => state.addWorkout);
	const workoutCoords = useGeoLocationStore((state) => state.workoutCoords);
	const setWorkoutCoords = useGeoLocationStore(
		(state) => state.setWorkoutCoords
	);

	const form = useForm<z.infer<typeof workoutSchema>>({
		resolver: zodResolver(workoutSchema),
		defaultValues: {
			type: undefined,
			duration: '',
			distance: '',
			cadence: '',
			elevation: '',
		},
	});

	function onSubmit(values: z.infer<typeof workoutSchema>) {
		const newWorkout = {
			id: crypto.randomUUID(),
			coords: workoutCoords,
			type: values.type,
			date: new Date().toISOString(),
			duration: +values.duration,
			distance: +values.distance,
			...(values.type === 'running'
				? { cadence: values.cadence }
				: { elevation: values.elevation }),
			speed: 10,
		};
		addWorkout(newWorkout as Workout);

		setOpen(false);
		setWorkoutCoords(null);
	}

	const handleOpenChange = (newOpen: boolean) => {
		form.reset();
		setOpen(newOpen);
	};

	return (
		<AlertDialog open={open} onOpenChange={handleOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Workout creation form</AlertDialogTitle>
					<AlertDialogDescription>
						position selected:{' '}
						{workoutCoords?.map((c) => c.toFixed(4)).join(', ')}
					</AlertDialogDescription>
				</AlertDialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='type'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger>
													<SelectValue placeholder='Select workout type' />
												</SelectTrigger>

												<SelectContent>
													<SelectGroup>
														<SelectItem value='running'>Running</SelectItem>
														<SelectItem value='cycling'>Cycling</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='duration'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Duration (minutes)</FormLabel>
										<FormControl>
											<Input type='number' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='distance'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Distance (km)</FormLabel>
										<FormControl>
											<Input type='number' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{form.watch('type') === 'running' && (
								<FormField
									control={form.control}
									name='cadence'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Cadence (steps/min)</FormLabel>
											<FormControl>
												<Input type='number' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							{form.watch('type') === 'cycling' && (
								<FormField
									control={form.control}
									name='elevation'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Elevation (meters)</FormLabel>
											<FormControl>
												<Input type='number' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</div>

						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<Button type='submit'>Create</Button>
						</AlertDialogFooter>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
