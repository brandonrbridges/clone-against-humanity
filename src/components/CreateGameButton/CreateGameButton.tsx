'use client'

// React
import { useState } from 'react'

// Hooks
import useToggle from '@/hooks/useToggle'

// Components
import CreateGameForm from '../CreateGameForm'
import Modal from '../Modal'

// Icons
import { IconCirclePlus } from '@tabler/icons-react'

const CreateGameButton = () => {
	const [visible, toggle] = useToggle()

	return (
		<>
			<button className='button' onClick={toggle}>
				Create Game
				<IconCirclePlus />
			</button>

			{visible && (
				<Modal title='Create Game' visible={visible} onClose={toggle}>
					<CreateGameForm />
				</Modal>
			)}
		</>
	)
}

export default CreateGameButton
