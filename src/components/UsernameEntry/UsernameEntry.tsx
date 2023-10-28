'use client'

// React
import { useState } from 'react'

// Redux
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setUser } from '@/redux/slices/auth.slice'

// Fetch
import { POST } from '@/lib/fetch'

const UsernameEntry: React.FC = () => {
	const auth = useAppSelector(({ auth }) => auth)
	const dispatch = useAppDispatch()

	const [username, setUsername] = useState('')

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const response = await POST('/users', {
			username,
		})

		if (response.username) {
			console.log(response)

			dispatch(setUser(response))
		}
	}

	if (auth.username) {
		return null
	}

	return (
		<div className='p-8 text-white bg-black rounded'>
			<p>Please enter a username</p>

			<form onSubmit={handleSubmit} className='flex items-center'>
				<input
					value={username}
					placeholder='Enter your Username'
					onChange={handleInput}
					className='text-black input'
				/>
				<button type='submit' className='button button-white'>
					Submit
				</button>
			</form>
		</div>
	)
}

export default UsernameEntry
