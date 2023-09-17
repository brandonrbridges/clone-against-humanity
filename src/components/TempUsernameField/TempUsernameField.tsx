'use client'

// Recoil
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { authState } from '@/recoil/authState'

// Packages
import { useForm } from 'react-hook-form'

export default function TempUsernameField() {
	const auth = useRecoilValue(authState)
	const setAuth = useSetRecoilState(authState)

	const { register, handleSubmit } = useForm()

	const onSubmit = handleSubmit(async (data) => {
		console.log(data)

		try {
			const response = await fetch('http://localhost:3001/users/temporary', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			const json = await response.json()

			setAuth(json)
		} catch (error) {
			console.log(error)
		}
	})

	if (auth) {
		return <p>Logged in as {auth.username}</p>
	}

	return (
		<form
			onSubmit={onSubmit}
			className='flex items-center p-1 bg-white rounded-md w-fit'
		>
			<input
				type='text'
				placeholder='Enter a Username'
				autoComplete='off'
				className='border-0 focus:outline-none focus:ring-0 text-zinc-950'
				{...register('username', { required: true })}
			/>
			<button
				type='submit'
				className='px-2 py-1 text-sm rounded-md bg-zinc-950'
			>
				Submit
			</button>
		</form>
	)
}
