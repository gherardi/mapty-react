import { ThemeProvider } from '@/components/theme-provider';

import { Sidebar } from '@/components/sidebar';
import { Map } from '@/components/map';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
			<div className='h-svh'>
				<div className='hidden xl:grid grid-cols-3 divide-x-[1.5px] h-full'>
					<Sidebar />
					<Map />
					<Toaster />
				</div>
				<div className='xl:hidden flex items-center justify-center h-full'>
					<p>App is only supported on desktop</p>
				</div>
			</div>
		</ThemeProvider>
	);
}
