import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		id: null,
		username: null,
		temporary: null,
		created_at: null,
	},
	reducers: {
		setUser: (state, action) => {
			Object.assign(state, action.payload)
		},
	},
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
