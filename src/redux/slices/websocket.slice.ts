// Redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Socket
import { io, Socket } from 'socket.io-client'

export const initialiseWebsocket = createAsyncThunk(
	'websocket/initialise',
	async (_, { dispatch, getState }) => {
		const state = getState() as any

		if (state.websocket.websocket) {
			return state.websocket.websocket
		}

		const socket = io(process.env.NEXT_PUBLIC_API as string)

		dispatch(setWebsocket(socket))

		socket.on('message', (message: any) => {
			console.log('message', message)

			dispatch(lastSocketMessage(message))
		})

		return socket
	}
)

export const closeWebsocket = createAsyncThunk(
	'websocket/close',
	async (_, { getState }) => {
		const { websocket } = getState() as any

		websocket?.close()
	}
)

const websocketSlice = createSlice({
	name: 'websocket',
	initialState: {
		websocket: null as Socket | null,
		messages: [] as any[],
	},
	reducers: {
		setWebsocket: (state, action) => {
			state.websocket = action.payload
		},
		lastSocketMessage: (state, action) => {
			console.log(action.payload)

			state.messages.push(action.payload)
		},
		sendSocketMessage: (state, action) => {
			const { type, payload } = action.payload

			state.websocket?.emit(type, payload)
		},
	},
})

export const { setWebsocket, lastSocketMessage, sendSocketMessage } =
	websocketSlice.actions

export default websocketSlice.reducer
