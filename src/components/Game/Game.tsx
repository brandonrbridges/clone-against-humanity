// Types
import type { TGame } from '@/types/game.types'

// Data
import cards from '@/data/cards.json'

// Components
import Card from '@/components/Card'
import PlayerHand from '@/components/PlayerHand'

type GameProps = {
	data: TGame
}

export default function Game(props: GameProps) {
	const getRandomWhiteCard = () => {
		const { white_cards } = cards

		return white_cards[Math.floor(Math.random() * white_cards.length)]
	}

	const getRandomBlackCard = () => {
		const { black_cards } = cards

		return black_cards[Math.floor(Math.random() * black_cards.length)]
	}

	if (!props.data.started) {
		return (
			<main className='flex flex-col items-center justify-center w-full h-full'>
				<p>This game hasn't started yet</p>

				<code className='p-2 mt-4 text-sm rounded-md bg-zinc-100'>
					<pre>{JSON.stringify(props.data, null, 2)}</pre>
				</code>
			</main>
		)
	}

	return (
		<main className='flex flex-col items-center w-full h-full'>
			<Card type='black' data={getRandomBlackCard()} />
			<PlayerHand>
				<Card type='white' data={getRandomWhiteCard()} />
				<Card type='white' data={getRandomWhiteCard()} />
				<Card type='white' data={getRandomWhiteCard()} />
				<Card type='white' data={getRandomWhiteCard()} />
			</PlayerHand>
		</main>
	)
}
