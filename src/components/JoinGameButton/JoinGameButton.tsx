// Next
import { useRouter } from 'next/navigation'

// Recoil
import { useRecoilValue } from 'recoil'
import { authState } from '@/recoil/authState'

type JoinGameButtonProps = {
	gameId: string
}

export default function JoinGameButton(props: JoinGameButtonProps) {
	const auth = useRecoilValue(authState)

	const router = useRouter()

	const handleJoinGame = async () => {
		await fetch(`http://localhost:3001/games/${props.gameId}/join`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: auth?.username,
			}),
		})

		router.push(`/game?id=${props.gameId}`)
	}

	return (
		<button onClick={handleJoinGame} className='sm'>
			Join Game
		</button>
	)
}
