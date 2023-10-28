import { useAppDispatch } from '@/redux/store'
import { sendSocketMessage } from '@/redux/slices/websocket.slice'

const PingButton = () => {
	const dispatch = useAppDispatch()

	const handleClick = () => {
		console.log('sending ping ')

		dispatch(
			sendSocketMessage({
				type: 'message',
				payload: 'ping',
			})
		)
	}

	return (
		<button className='button' onClick={handleClick}>
			Ping
		</button>
	)
}

export default PingButton
