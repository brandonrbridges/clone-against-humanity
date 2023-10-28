// Components
import CreateGameButton from '../CreateGameButton'
import UsernameButton from '../UsernameButton'

// Icons
import { IconCards } from '@tabler/icons-react'

const HomeHeader: React.FC = () => {
	return (
		<>
			<div className='flex flex-col items-center justify-center mb-4 space-y-1'>
				<div className='flex items-center justify-center space-x-2'>
					<IconCards />
					<h1 className='text-2xl font-medium tracking-tighter text-center'>
						Clone Against Humanity
					</h1>
				</div>
				<p className='text-xs text-neutral-400'>
					Not affiliated with Cards Against Humanity &copy;
				</p>
			</div>
			<div className='flex items-center justify-center pb-4 mb-4 border-b'>
				<div className='flex items-center justify-start space-x-4'>
					<CreateGameButton />
				</div>
				<div className='flex items-center justify-end space-x-4'>
					<UsernameButton />
				</div>
			</div>
		</>
	)
}

export default HomeHeader
