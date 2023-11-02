'use client'

// Types
import type { Game, GameCard } from '@/types/game.type'

// React
import { useEffect, useState } from 'react'

// Fetch
import { GET } from '@/lib/fetch'

// Components
import Card from '@/components/Game/Card/Card'
import CreateCardButton from '@/components/CreateCardButton'

export default function CardsPage() {
	const [cards, setCards] = useState<Array<GameCard>>([])

	const updateState = (card: GameCard) => {
		setCards((state) => [...state, card])
	}

	useEffect(() => {
		const fetchCards = async () => {
			const cards = await GET('/cards')

			setCards(cards)
		}

		fetchCards()
	})

	return (
		<div>
			<div className='flex items-center justify-between mb-4'>
				<h1>White Cards</h1>
				<CreateCardButton
					text='Create White Card'
					updateState={updateState}
					type='white'
				/>
			</div>
			<div className='grid grid-cols-2 gap-4 mb-8 md:grid-cols-6'>
				{cards
					?.filter((card) => card.type === 'white')
					?.map((card) => (
						<Card key={card.id} {...card} />
					))}
			</div>
			<div className='flex items-center justify-between mb-4'>
				<h1>Black Cards</h1>
				<CreateCardButton
					text='Create Black Card'
					updateState={updateState}
					type='black'
				/>
			</div>
			<div className='grid grid-cols-2 gap-4 mb-8 md:grid-cols-6'>
				{cards
					?.filter((card) => card.type === 'black')
					?.map((card) => (
						<Card key={card.id} {...card} />
					))}
			</div>
		</div>
	)
}
