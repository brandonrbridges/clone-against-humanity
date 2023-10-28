'use client'

// Redux
import { Provider } from 'react-redux'

// Store
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'

type Props = {
	children: React.ReactNode
}

const ReduxProvider: React.FC<Props> = (props) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{props.children}
			</PersistGate>
		</Provider>
	)
}

export default ReduxProvider
