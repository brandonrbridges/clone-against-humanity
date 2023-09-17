// Client Components
import { AuthButtons, CreateGameButton } from './Header.client'

// Icons
import { IconCardsFilled } from '@tabler/icons-react'

export default function Header() {
	return (
		<div className='container pt-4'>
			<div className='grid grid-cols-3 gap-4'>
				<div className='flex items-center justify-start space-x-4'>
					<CreateGameButton />
					<button className='px-2 py-1 text-sm border rounded-md border-zinc-950 hover:bg-zinc-950 hover:text-white'>
						Join a Game
					</button>
				</div>
				<div>
					<div className='flex items-center justify-center space-x-2 w-fit'>
						<IconCardsFilled size={48} stroke={1} />
						<h1 className='text-4xl font-semibold tracking-tighter whitespace-nowrap'>
							Clone Against Humanity
						</h1>
					</div>
					<p className='mt-2 text-xs text-center text-zinc-400'>
						We are not affiliated with &copy; Cards Against Humanity
					</p>
				</div>
				<div className='flex items-center justify-end space-x-4'>
					<AuthButtons />
				</div>
			</div>
		</div>
	)
}
