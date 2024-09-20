import { useState } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';

export function SidebarHeader() {
	const [open, setOpen] = useState(false);

	return (
		<h1 className='text-lg font-medium flex items-center gap-1'>
			<img
				src='./icon.png'
				alt='brand icon'
				className='w-8 h-8'
				loading='lazy'
			/>
			<p>Mapty | Track your workouts</p>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant='outline'
							size='icon'
							className='ml-auto'
							onClick={() => setOpen(true)}
						>
							<InfoCircledIcon className='h-4 w-4' />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Information about the app</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>How to use Mapty?</AlertDialogTitle>
						<AlertDialogDescription className='space-y-6'>
							<p>
								<Badge variant={'destructive'} className='scale-[80%]'>
									Important
								</Badge>{' '}
								Mapty is an application with no permanent memory: each time you
								reload the page, the saved workouts will be deleted.
							</p>
							<p>
								To create a new workout, simply click on the map at the point
								where you want to record it. A screen will open where you can
								enter the details of your workout. Once completed, click
								'Create' to save it.
							</p>
							<p>
								Saved workouts will appear in a list on the left. By clicking on
								a workout, you will automatically be taken back to the exact
								point on the map where it was recorded.
							</p>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction className='bg-secondary-foreground hover:bg-secondary-foreground/90'>
							Ok, I understand
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</h1>
	);
}
