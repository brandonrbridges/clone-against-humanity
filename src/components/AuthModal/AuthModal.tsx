'use client'

// React
import { useState } from 'react'

// Components
import Modal from '@/components/Modal'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '../RegisterForm'

type AuthModalProps = {
	visible: boolean
	toggle: () => void
}

const AuthModal: React.FC<AuthModalProps> = (props) => {
	const [page, setPage] = useState<'login' | 'register'>('login')

	const title = page === 'login' ? 'Login' : 'Register'

	return (
		<Modal title={title} visible={props.visible} toggle={props.toggle}>
			<div className='space-y-4'>
				{page === 'login' && (
					<>
						<LoginForm />
						<div className='p-2 border rounded'>
							<p className='text-sm text-gray-500'>Don't have an account?</p>
							<button onClick={() => setPage('register')}>
								Create an account
							</button>
						</div>
					</>
				)}

				{page === 'register' && (
					<>
						<RegisterForm />
						<div className='p-2 border rounded'>
							<p className='text-sm text-gray-500'>Already have an account?</p>
							<button onClick={() => setPage('login')}>Login</button>
						</div>
					</>
				)}
			</div>
		</Modal>
	)
}

export default AuthModal
