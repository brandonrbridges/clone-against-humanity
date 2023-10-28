// Types
import type { Game, GameRound } from '@/types/game.type'
import type { User } from '@/types/user.type'

// Components
import Chip from '@/components/Chip'

// Icons
import { IconCards } from '@tabler/icons-react'

type SidebarProps = {
	game: Game
	round: GameRound | undefined
}

const Sidebar: React.FC<SidebarProps> = (props) => {
	return (
		<div className='space-y-4'>
			<div className='p-4 border rounded'>
				<p className='mb-2 font-medium'>{props.game.name}</p>
				<p>Invite Code: {props.game.invite_code}</p>
				<p>Max Players: {props.game.max_players}</p>
				<p>Max Rounds: {props.game.max_rounds}</p>
			</div>

			<div className='p-4 border rounded'>
				<p className='mb-2 font-medium'>Players</p>

				<div className='space-y-0.5'>
					{props.game.players?.map((player: User) => {
						const isHost = player.id === props.game.host
						const isCzar = player.id === props.round?.czar_id

						let score = 0

						props.game.rounds.forEach((round: GameRound) => {
							if (round?.winning_card?.player_id === player.id) {
								score++
							}
						})

						return (
							<div
								key={player.id}
								className='flex items-center justify-between'
							>
								<p className='flex items-center space-x-1'>
									<span>{player.username}</span>
									{isHost && <Chip>Host</Chip>}
									{isCzar && <IconCards size={16} />}
								</p>
								<p>{score}</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Sidebar
