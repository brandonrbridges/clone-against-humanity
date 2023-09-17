'use client'

// Next
import { useRouter, useSearchParams } from 'next/navigation'

// Recoil
import { useRecoilValue } from 'recoil'
import { authState } from '@/recoil/authState'

export default function LeaveGameButton() {
	const auth = useRecoilValue(authState)

	const router = useRouter()

	const params = useSearchParams()

	const handleLeaveGame = async () => {
		try {
			const id = params.get('id')

			await fetch(`http://localhost:3001/games/${id}/leave`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: auth?.username,
				}),
			})

			router.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<button onClick={handleLeaveGame} className='w-full'>
			Leave Game
		</button>
	)
}
