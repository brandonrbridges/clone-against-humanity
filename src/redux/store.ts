// Redux
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Persist
import { persistStore, persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/es/storage/session'

// Slices
import authSlice from './slices/auth.slice'
import websocketSlice from './slices/websocket.slice'

const persistConfig = {
	key: 'clone-against-humanity',
	storage: sessionStorage,
}

const rootReducer = combineReducers({
	auth: authSlice,
	websocket: websocketSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store)

export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof rootReducer>
> = useSelector
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
