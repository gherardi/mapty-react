import { Loader2 } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import useLocationStore, {
	UserGeoLocationStatus,
} from '@/stores/geo-location-store';
import useMapStore from '@/stores/map-store';

export function LocationStatusDisplay() {
	const map = useMapStore((state) => state.map);
	const userCoords = useLocationStore((state) => state.userCoords);
	const userLocationStatus = useLocationStore(
		(state) => state.userLocationStatus
	);

	switch (userLocationStatus) {
		case UserGeoLocationStatus.FETCHING:
			return (
				<div className='flex items-center'>
					<Loader2 className='mr-2 h-4 w-4 animate-spin inline-block' />
					Fetching your location...
				</div>
			);
		case UserGeoLocationStatus.SUCCESS:
			return (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='link'
								className='px-0 py-0 h-fit text-foreground'
								onClick={() => {
									if (map) map.flyTo(userCoords, map.getZoom());
								}}
							>
								{userCoords.join(', ') || 'Unknown location'}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Your current position</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			);
		case UserGeoLocationStatus.ERROR:
			return 'Unable to fetch your location';
		default:
			return null;
	}
}
