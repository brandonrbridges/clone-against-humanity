import { atom } from 'recoil'
import { persistAtom } from './config'

export type Auth = {
	id: string
	username: string
	email?: string
	password?: string
} | null

export const authState = atom<Auth>({
	key: 'authentication',
	default: null,
	effects: [persistAtom],
})
