'use client'

// Redux
import { useAppSelector } from '@/redux/store'

const UsernameButton: React.FC = () => {
	const auth = useAppSelector(({ auth }) => auth)

	if (!auth.username) {
		return null
	}

	return <button className='button'>{auth.username}</button>
}

export default UsernameButton
