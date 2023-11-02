'use client'

// Redux
import { useAppSelector } from '@/redux/store'

// Hooks
import useToggle from '@/hooks/useToggle'

// Components
import AuthModal from '@/components/AuthModal'

const AuthButton: React.FC = () => {
	const auth = useAppSelector(({ auth }) => auth)

	const [visible, toggle] = useToggle()

	if (auth.username) return null

	return (
		<>
			<button className='button' onClick={toggle}>
				Login or Register
			</button>

			{visible && <AuthModal visible={visible} toggle={toggle} />}
		</>
	)
}

export default AuthButton
