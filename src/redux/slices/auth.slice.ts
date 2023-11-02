// Types
import type { AuthRolesEnum } from '@/redux/types/auth.types'

// Redux
import { createSlice } from '@reduxjs/toolkit'

type AuthState = {
	id: string | null
	email: string | null
	username: string | null
	password: string | null
	access_token: string | null
	roles: AuthRolesEnum[]
	created_at: string | null
}

const initialState: AuthState = {
	id: null,
	email: null,
	username: null,
	password: null,
	access_token: null,
	roles: [],
	created_at: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		login: (state, action) => {
			Object.assign(state, action.payload)
		},
		logout: (state) => {
			Object.assign(state, initialState)
		},
		setAccessToken: (state, action) => {
			state.access_token = action.payload
		},
	},
})

export const { login, logout, setAccessToken } = authSlice.actions

export default authSlice.reducer
