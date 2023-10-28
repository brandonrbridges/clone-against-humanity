'use client'

// React
import { useEffect } from 'react'

// Redux
import { useAppDispatch, useAppSelector } from '@/redux/store'
import {
	closeWebsocket,
	initialiseWebsocket,
} from '@/redux/slices/websocket.slice'

// Components
import HomeHeader from '@/components/HomeHeader'

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const auth = useAppSelector(({ auth }) => auth)
	const websocket = useAppSelector(({ websocket }) => websocket)
	const dispatch = useAppDispatch()

	// useEffect(() => {
	// 	if (!websocket.websocket) {
	// 		dispatch(initialiseWebsocket())
	// 	}

	// 	return () => {
	// 		dispatch(closeWebsocket())
	// 	}
	// }, [])

	return (
		<main className='p-4'>
			<HomeHeader />

			{children}
		</main>
	)
}
