'use client'

// Types
import type { TGame, TPlayer } from '@/types/game.types'

// React
import { useEffect, useState } from 'react'

// Socket
import io from 'socket.io-client'

// Components
import ConnectedPlayers from '@/components/ConnectedPlayers'
import Game from '@/components/Game'
import LeaveGameButton from '@/components/LeaveGameButton'
import NoGameNotice from '@/components/NoGameNotice'

export default function GamePage({
	searchParams,
}: {
	searchParams: {
		id: string
	}
}) {
	const [gameData, setGameData] = useState<TGame | null>(null)

	useEffect(() => {
		getGameData(searchParams.id).then((data) => setGameData(data))
	}, [searchParams.id])

	useEffect(() => {
		const socket = io('http://localhost:3001', {
			query: {
				gameId: searchParams.id,
			},
		})

		socket.emit('joinGame', searchParams.id)

		socket.on('playerJoined', (player: TPlayer) => {
			setGameData((state) => {
				const existingPlayer = state?.players.find((p) => p.id === player.id)

				if (existingPlayer) {
					existingPlayer.connected = true
				} else {
					state?.players.push(player)
				}

				return { ...state }
			})
		})

		socket.on('playerLeft', (player: TPlayer) => {
			console.log('player left')

			setGameData((state) => {
				const existingPlayer = state?.players.find((p) => p.id === player.id)

				if (existingPlayer) {
					existingPlayer.connected = false
				}

				return { ...state }
			})
		})

		return () => {
			socket.disconnect()
		}
	}, [])

	if (!searchParams.id || !gameData) return <NoGameNotice />

	return (
		<div className='flex w-full h-screen'>
			<div className='flex flex-col w-64 h-full p-2 bg-zinc-50'>
				<ConnectedPlayers data={gameData.players} />

				<div className='mt-auto'>
					<LeaveGameButton />
				</div>
			</div>
			<div className='flex-1 h-full p-4'>
				<Game data={gameData} />
			</div>
		</div>
	)
}

async function getGameData(id: string) {
	const response = await fetch(`http://localhost:3001/games/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	})

	const json = await response.json()

	return json as TGame
}
