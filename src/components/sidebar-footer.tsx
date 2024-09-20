import { useTheme } from '@/components/theme-provider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { LocationStatusDisplay } from '@/components/location-status-display';

export function SidebarFooter() {
	const { theme, setTheme } = useTheme();

	return (
		<div className='flex items-center justify-between pt-8 mt-auto'>
			<div className='text-muted-foreground text-sm'>
				<LocationStatusDisplay />
			</div>
			<div className='flex items-center space-x-2'>
				<Label htmlFor='dark-mode' className='font-medium'>
					Dark Mode
				</Label>
				<Switch
					id='dark-mode'
					checked={theme === 'dark'}
					onCheckedChange={(e) => setTheme(e ? 'dark' : 'light')}
				/>
			</div>
		</div>
	);
}
