'use client'

// Types
import type { Game } from '@/types/game.type'

// React
import { useEffect, useState } from 'react'

// Next
import { useRouter } from 'next/navigation'

// Redux
import { useAppSelector } from '@/redux/store'

// Fetch
import { GET, PUT } from '@/lib/fetch'

// Components
import Chip from '../Chip'

// Packages
import io from 'socket.io-client'

const GameList = () => {
	const [games, setGames] = useState<Array<any>>([])

	useEffect(() => {
		const getGames = async () => {
			const games = await GET('/games')

			setGames(games)
		}

		getGames()
	}, [])

	useEffect(() => {
		const socket = io('http://localhost:4000')

		socket.on('game_created', (game) => {
			setGames([...games, game])
		})

		socket.on('game_updated', (game: Game) => {
			const index = games.findIndex((g) => g.id === game.id)

			const updated = [...games]

			updated[index] = game

			setGames(updated)
		})

		return () => {
			socket.disconnect()
		}
	}, [])

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
			{games.map((game) => (
				<Item key={game.id} game={game} />
			))}
		</div>
	)
}

const Item = ({ game }: { game: any }) => {
	const router = useRouter()

	const auth = useAppSelector(({ auth }) => auth)

	const handleJoinGame = async () => {
		await PUT(`/games/${game.id}/join`, {
			player_id: auth.id,
		})

		router.push(`/games/${game.id}`)
	}

	return (
		<div className='p-4 border rounded'>
			<div className='flex items-center space-x-4'>
				<p className='font-medium'>{game.name}</p>
				<Chip>
					{game?.players?.length || 0}/{game.max_players} players
				</Chip>
			</div>
			<button onClick={handleJoinGame} className='ml-auto button'>
				Join Game
			</button>
		</div>
	)
}

export default GameList
