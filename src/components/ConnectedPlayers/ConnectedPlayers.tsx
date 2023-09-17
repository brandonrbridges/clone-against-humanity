// Types
import { TPlayer } from '@/types/game.types'

// Icons
import { IconCrown, IconPlugConnectedX } from '@tabler/icons-react'

type ConnectedPlayersProps = {
	data: TPlayer[]
}

export default function ConnectedPlayers(props: ConnectedPlayersProps) {
	return (
		<div className='w-full p-4 border rounded-md'>
			<div className='pb-4 border-b'>
				<p>Players</p>
			</div>
			<div className='flex flex-col mt-4 space-y-4'>
				{props.data?.length &&
					props.data
						.sort((a, b) => b.score - a.score)
						.map((player, index) => {
							return (
								<div className='flex items-center justify-between'>
									<div className='flex items-center space-x-2'>
										<p>{player.username}</p>
										{!player.connected && (
											<IconPlugConnectedX size={20} stroke={1.25} />
										)}
									</div>
									<div className='flex items-center space-x-2'>
										<p>{player.score}</p>
										{index === 0 && <IconCrown size={20} stroke={1.25} />}
									</div>
								</div>
							)
						})}
			</div>
		</div>
	)
}
