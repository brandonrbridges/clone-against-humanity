import { Game } from './game.type'

export type User = {
	id: string
	username: string
	temporary: boolean
	games: Game[]
	created_at: Date
}
