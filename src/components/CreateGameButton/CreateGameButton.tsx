'use client'

// React
import { useState } from 'react'

// Redux
import { useAppSelector } from '@/redux/store'

// Hooks
import useToggle from '@/hooks/useToggle'

// Components
import CreateGameForm from '../CreateGameForm'
import Modal from '../Modal'

// Icons
import { IconCirclePlus } from '@tabler/icons-react'

const CreateGameButton = () => {
	const auth = useAppSelector(({ auth }) => auth)

	const [visible, toggle] = useToggle()

	if (!auth.username) return null

	return (
		<>
			<button className='button' onClick={toggle}>
				Create Game
				<IconCirclePlus />
			</button>

			{visible && (
				<Modal title='Create Game' visible={visible} toggle={toggle}>
					<CreateGameForm />
				</Modal>
			)}
		</>
	)
}

export default CreateGameButton
