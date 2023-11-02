'use client'

// Redux
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { logout } from '@/redux/slices/auth.slice'

// Hooks
import useToggle from '@/hooks/useToggle'

const UsernameButton: React.FC = () => {
	const auth = useAppSelector(({ auth }) => auth)
	const dispatch = useAppDispatch()

	const [visible, toggle] = useToggle()

	const handleLogout = () => {
		dispatch(logout())
	}

	if (!auth.username) {
		return null
	}

	return (
		<div className='relative'>
			<button className='button' onClick={toggle}>
				{auth.username}
			</button>

			{visible && (
				<div className='absolute right-0 flex flex-col items-end'>
					<div className='absolute inset-0 z-10' onClick={toggle}></div>

					<div className='absolute z-20 w-fit'>
						<div className='p-4 text-white bg-black rounded w-fit whitespace-nowrap'>
							<p>Username: {auth.username}</p>
							<p>Wins: </p>
							<p>Losses: </p>
							<hr className='my-2' />
							<button onClick={handleLogout}>Logout</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default UsernameButton
