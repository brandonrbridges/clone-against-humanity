export type TGame = {
	id: string
	name: string
	inviteCode: string
	rounds: number
	currentRound: number
	maxPlayers: number
	players: TPlayer[]
	started: boolean
}

export type TPlayer = {
	id: string
	ipAddress: string
	username: string
	email?: string
	host: boolean
	connected: boolean
	score: number
	game: TGame
	gameId: TGame['id']
}
