'use client'

// Types
import type { Game, GameCard, SelectedCard } from '@/types/game.type'

// React
import { useEffect, useState } from 'react'

// Next
import { useRouter } from 'next/navigation'

// Redux
import { useAppSelector } from '@/redux/store'

// Fetch
import { GET, PUT } from '@/lib/fetch'

// Components
import Card, { CardContainer } from '@/components/Game/Card/Card'
import Sidebar from '@/components/Game/Sidebar'

// Icons
import { IconCards, IconCrown } from '@tabler/icons-react'

// Packages
import ConfettiExplosion from 'react-confetti-explosion'
import { io } from 'socket.io-client'

export default function Game({
	params,
}: {
	params: {
		id: string
	}
}) {
	const router = useRouter()

	const auth = useAppSelector(({ auth }) => auth)

	const [game, setGame] = useState<Game>()

	const [hand, setHand] = useState<Array<GameCard>>([])
	const [blackHand, setBlackHand] = useState<Array<GameCard>>([])

	const [round, setRound] = useState<Game['rounds'][0]>()

	const leaveGame = async () => {
		await PUT(`/games/${params.id}/leave`, {
			player_id: auth.id,
		})

		router.push('/')
	}

	const startGame = async () => {
		await PUT(`/games/${params.id}/start`, {
			player_id: auth.id,
		})
	}

	const handleSelectBlackCard = async (card: GameCard) => {
		await PUT(`/games/${params.id}/select-black-card`, {
			player_id: auth.id,
			card_id: card.id,
		})
	}

	const handleSelectWhiteCard = async (card: GameCard) => {
		if (!round?.black_card) {
			return
		}

		if (
			round?.white_cards?.find((c: SelectedCard) => c.player_id === auth.id)
		) {
			return
		}

		await PUT(`/games/${params.id}/select-white-card`, {
			player_id: auth.id,
			card_id: card.id,
		})

		setHand(hand.filter((c) => c.id !== card.id))
	}

	const handleSelectWinningCard = async (card: GameCard) => {
		await PUT(`/games/${params.id}/select-winning-card`, {
			card_id: card.id,
		})
	}

	useEffect(() => {
		const getGameData = async () => {
			const game = await GET(`/games/${params.id}`)

			setGame(game)
		}

		getGameData()
	}, [])

	useEffect(() => {
		const socket = io(process.env.NEXT_PUBLIC_API as string)

		socket.on('game_updated', (data: Game) => {
			if (data.id === params.id) {
				setGame(data)
				setRound(data.rounds[data.rounds.length - 1])
			}
		})

		return () => {
			socket.disconnect()
		}
	}, [])

	useEffect(() => {
		const getHand = () => {
			GET('/cards/white/hand').then((data) => setHand(data))
		}

		const getBlackHand = () => {
			GET('/cards/black/hand').then((data) => setBlackHand(data))
		}

		const getWhiteCard = async () => {
			GET(`/cards/white`).then((response) => setHand([...hand, response]))
		}

		if (!game) return

		const round = game.rounds[game.rounds.length - 1]

		setRound(round)

		if (game?.rounds[game.rounds.length - 1]?.czar_id === auth.id) {
			getBlackHand()
		}

		if (hand.length === 0) {
			getHand()
		} else if (hand.length < 5) {
			getWhiteCard()
		}
	}, [game?.rounds.length])

	if (!game) {
		return (
			<div className='flex items-center justify-center w-full h-screen'>
				<p>Loading Game..</p>
			</div>
		)
	}

	if (!auth.access_token) {
		return (
			<div>
				<p>Not logged in</p>
			</div>
		)
	}

	return (
		<>
			<div className='flex w-full h-screen overflow-hidden'>
				<div className='flex-col hidden h-full p-4 border-r w-80 md:flex'>
					<Sidebar game={game} round={round} />

					<div className='mt-auto space-y-4'>
						{game.host === auth.id && game.rounds.length === 0 && (
							<button
								onClick={startGame}
								className='w-full button button-filled'
							>
								Start Game
							</button>
						)}
						<button onClick={leaveGame} className='w-full mt-auto button'>
							Leave Game
						</button>
					</div>
				</div>

				<div className='relative flex-1 w-full h-screen p-4'>
					{game?.rounds?.length === 0 && (
						<div className='flex items-center justify-center w-full h-full'>
							<p>This game hasn't started yet</p>
						</div>
					)}

					{game?.rounds.length > 0 && (
						<div className='flex flex-col h-full'>
							<p>Round {game?.rounds[game.rounds.length - 1].number}</p>

							{/**
							 * CZAR VIEW
							 */}
							{round?.czar_id === auth.id && (
								<>
									<div className='flex items-center justify-center mb-4 space-x-2'>
										<IconCards size={16} />
										<p className='font-medium'>You are the Card Czar</p>
									</div>

									{!round.black_card && (
										<div className='flex flex-col items-center space-x-2'>
											<div className='mb-4'>
												<p className='text-center'>Please select a card</p>
											</div>

											<CardContainer>
												{blackHand?.filter(Boolean)?.map((card) => (
													<Card
														key={card.id}
														{...card}
														onClick={() => handleSelectBlackCard(card)}
													/>
												))}
											</CardContainer>
										</div>
									)}

									{round?.black_card && (
										<div className='flex flex-col h-full'>
											<div className='flex items-center justify-center'>
												<Card key={round.black_card.id} {...round.black_card} />
											</div>

											{round?.white_cards?.length ===
												game?.players?.length - 1 && (
												<div className='mt-auto'>
													<p className='mb-4 text-center'>
														Please select a winner
													</p>
													<CardContainer className='mt-auto'>
														{round?.white_cards
															?.filter(Boolean)
															?.map((card) => (
																<Card
																	key={card.id}
																	{...card}
																	onClick={() => handleSelectWinningCard(card)}
																/>
															))}
													</CardContainer>
												</div>
											)}
										</div>
									)}
								</>
							)}

							{/**
							 * PLAYER VIEW
							 */}
							{round?.czar_id !== auth.id && (
								<>
									{round?.black_card ? (
										<div className='flex items-center justify-center'>
											<Card key={round.black_card.id} {...round.black_card} />
										</div>
									) : (
										<p>Waiting for the Card Czar to pick a card</p>
									)}

									<CardContainer className='w-full py-2 mt-auto'>
										{hand?.filter(Boolean)?.map((card) => (
											<Card
												key={card.id}
												{...card}
												onClick={() =>
													round?.black_card && handleSelectWhiteCard(card)
												}
											/>
										))}
									</CardContainer>
								</>
							)}
						</div>
					)}

					{game?.rounds?.find((r) => r?.number === round?.number)?.winning_card
						?.player_id === auth.id &&
						!game.winner && (
							<>
								<div className='absolute top-0 left-0 flex items-center justify-center w-full h-full'>
									<div className='flex flex-col items-center justify-center'>
										<p className='text-4xl'>You won this round!</p>
										<ConfettiExplosion
											force={0.8}
											duration={5000}
											particleCount={500}
											width={1600}
											className='mx-auto'
										/>
									</div>
								</div>
							</>
						)}

					{game.winner === auth.id && (
						<>
							<div className='absolute top-0 left-0 flex items-center justify-center w-full h-full'>
								<div className='flex flex-col items-center justify-center'>
									<IconCrown size={64} stroke={1} />
									<p className='text-4xl'>You won the game!</p>
									<ConfettiExplosion
										force={0.8}
										duration={15000}
										particleCount={1000}
										width={1600}
										className='mx-auto'
									/>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	)
}
