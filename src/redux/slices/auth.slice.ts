import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	id: null,
	email: null,
	username: null,
	password: null,
	access_token: null,
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
