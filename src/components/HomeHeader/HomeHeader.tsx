// Components
import AuthButton from '../AuthButton'
import CreateGameButton from '../CreateGameButton'
import UsernameButton from '../UsernameButton'

// Icons
import { IconCards } from '@tabler/icons-react'

const HomeHeader: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-between pb-4 mb-8 space-y-4 border-b'>
			<div className='flex flex-col items-center space-y-1'>
				<div className='flex items-center justify-center space-x-2'>
					<IconCards />
					<h1 className='text-2xl font-medium tracking-tight text-center'>
						Clone Against Humanity
					</h1>
				</div>
				<p className='text-xs text-neutral-400'>
					Not affiliated with Cards Against Humanity &copy;
				</p>
			</div>
			<div className='flex items-center justify-center space-x-4'>
				<CreateGameButton />
				<AuthButton />
				<UsernameButton />
			</div>
		</div>
	)
}

export default HomeHeader
