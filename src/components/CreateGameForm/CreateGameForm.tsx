'use client'

// React
import { useEffect } from 'react'

// Next
import { useRouter } from 'next/navigation'

// Recoil
import { useRecoilValue } from 'recoil'
import { authState } from '@/recoil/authState'

// Packages
import { useForm } from 'react-hook-form'

export default function CreateGameForm() {
	const auth = useRecoilValue(authState)

	const router = useRouter()

	const { register, setValue, handleSubmit } = useForm({
		defaultValues: {
			name: 'test',
			inviteCode: 'test',
			rounds: 10,
			maxPlayers: 8,
		},
	})

	const onSubmit = handleSubmit(async (data) => {
		console.log(data)

		try {
			const response = await fetch('http://localhost:3001/games/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user: auth,
					...data,
				}),
			})

			const json = await response.json()

			router.push(`/game?id=${json.id}`)
		} catch (error) {
			console.log(error)
		}
	})

	useEffect(() => {
		const generate5LetterInviteCode = () => {
			const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

			let code = ''

			for (let i = 0; i < 5; i++) {
				code += alphabet[Math.floor(Math.random() * alphabet.length)]
			}

			return code
		}

		setValue('inviteCode', generate5LetterInviteCode())
	}, [])

	return (
		<form onSubmit={onSubmit} className='flex flex-col space-y-4'>
			<div>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					placeholder='Name'
					className='px-2 py-1 rounded'
					{...register('name')}
				/>
			</div>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
				<div>
					<label htmlFor='rounds'>Rounds</label>
					<input
						id='rounds'
						type='number'
						placeholder='Rounds'
						className=''
						{...register('rounds')}
					/>
				</div>
				<div>
					<label htmlFor='maxPlayers'>Max Players</label>
					<input
						id='maxPlayers'
						type='number'
						placeholder='Max Players'
						className='w-full px-2 py-1 rounded'
						{...register('maxPlayers')}
					/>
				</div>
			</div>
			<div>
				<label htmlFor='code'>Invite Code</label>
				<input
					id='code'
					type='text'
					placeholder='Invite Code'
					className='w-full px-2 py-1 rounded'
					{...register('inviteCode')}
				/>
			</div>
			<button type='submit' className='filled'>
				Create Game
			</button>
		</form>
	)
}
