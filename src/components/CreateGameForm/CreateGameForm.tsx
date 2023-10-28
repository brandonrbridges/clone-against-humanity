'use client'

// Fetch
import { POST, PUT } from '@/lib/fetch'

// Helpers
import { generateInviteCode } from './CreateGameForm.helpers'

// Packages
import { useForm } from 'react-hook-form'
import { useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'

const CreateGameForm = () => {
	const auth = useAppSelector(({ auth }) => auth)

	const router = useRouter()

	const { register, handleSubmit } = useForm({
		defaultValues: {
			host: auth.id,
			name: `${auth.username}'s Game`,
			invite_code: generateInviteCode(),
			max_players: 8,
			max_rounds: 10,
		},
	})

	const onSubmit = handleSubmit(async (data) => {
		const game = await POST('/games', data)

		await PUT(`/games/${game.id}/join`, {
			player_id: auth.id,
		})

		router.push(`/games/${game.id}`)
	})

	return (
		<form onSubmit={onSubmit} className='space-y-4'>
			<div>
				<label htmlFor='name'>Name</label>
				<input
					id='name'
					type='text'
					className='input'
					{...register('name', {
						required: true,
					})}
				/>
			</div>
			<div>
				<label htmlFor='invite_code'>Invite Code</label>
				<input
					id='invite_code'
					type='text'
					className='input'
					{...register('invite_code')}
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<div>
					<label htmlFor='max_players'>Max Players</label>
					<input
						id='max_players'
						type='number'
						className='input'
						{...register('max_players')}
					/>
				</div>
				<div>
					<label htmlFor='max_rounds'>Max Rounds</label>
					<input
						id='max_rounds'
						type='number'
						className='input'
						{...register('max_rounds')}
					/>
				</div>
			</div>
			<button type='submit' className='ml-auto button'>
				Create Game
			</button>
		</form>
	)
}

export default CreateGameForm
