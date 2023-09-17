'use client'

// Types
import type { TGame, TPlayer } from '@/types/game.types'

// React
import { useEffect, useState } from 'react'

// Socket
import io from 'socket.io-client'

// Icons
import { IconUsers } from '@tabler/icons-react'
import JoinGameButton from '../JoinGameButton'

export default function LobbyList() {
	const [lobbies, setLobbies] = useState<TGame[]>([])

	useEffect(() => {
		getLobbies().then((lobbies) => setLobbies(lobbies))

		const socket = io('http://localhost:3001')

		socket.on('gameCreated', (data: TGame) => {
			setLobbies((lobbies) => [...lobbies, data])
		})

		socket.on('gameDeleted', (gameId: string) => {
			setLobbies((lobbies) => lobbies.filter((lobby) => lobby.id !== gameId))
		})

		socket.on('gameUpdated', (data: TGame) => {
			console.log('gameUpdated', data)

			setLobbies((lobbies) => {
				const index = lobbies.findIndex((lobby) => lobby.id === data.id)

				lobbies[index] = data

				return [...lobbies]
			})
		})

		return () => {
			socket.disconnect()
		}
	}, [])

	const Lobby = (props: TGame) => {
		const host = props.players.find((player) => player.host) as TPlayer
		const connectedPlayers = props.players.filter((player) => player.connected)

		return (
			<div className='flex flex-col p-3 transition-all border rounded-md hover:shadow-md'>
				<p>{props.name}</p>
				<p className='text-sm'>Hosted by {host.username}</p>
				<p>Code: {props.inviteCode}</p>

				<div className='flex items-end justify-between'>
					<div className='flex items-center space-x-1'>
						<IconUsers size={16} stroke={1.5} />
						<p>
							{connectedPlayers.length} / {props.maxPlayers}
						</p>
					</div>
					<JoinGameButton gameId={props.id} />
				</div>
			</div>
		)
	}

	return (
		<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
			{lobbies.map((lobby: TGame) => (
				<Lobby key={lobby.id} {...lobby} />
			))}
		</div>
	)
}

async function getLobbies() {
	const response = await fetch('http://localhost:3001/games')

	const json = await response.json()

	return json
}
