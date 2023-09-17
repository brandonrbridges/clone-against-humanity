'use client'

// React
import { useState } from 'react'

// Recoil
import { useRecoilValue } from 'recoil'
import { authState } from '@/recoil/authState'

// Hooks
import useHydration from '@/hooks/useHydration'

// Icons
import { IconUserCircle } from '@tabler/icons-react'
import Modal from '@/components/Modal'
import CreateGameForm from '@/components/CreateGameForm'

export const AuthButtons = () => {
	const isHydrated = useHydration()

	const auth = useRecoilValue(authState)

	if (!isHydrated) return null

	if (auth) {
		return (
			<>
				<button className='px-2 py-1 text-sm border rounded-md border-zinc-950 hover:bg-zinc-950 hover:text-white'>
					Claim Username
				</button>
				<button className='flex items-center px-2 py-1 text-sm border rounded-md border-zinc-950 hover:bg-zinc-950 hover:text-white'>
					<IconUserCircle size={20} stroke={1.25} className='mr-1' />
					{auth.username}
				</button>
			</>
		)
	}
}

export const CreateGameButton = () => {
	const [modalOpen, setModalOpen] = useState(false)

	const handleOpen = () => setModalOpen(true)

	return (
		<>
			<button
				onClick={handleOpen}
				className='px-2 py-1 text-sm border rounded-md border-zinc-950 hover:bg-zinc-950 hover:text-white'
			>
				Host a Game
			</button>

			<Modal
				title='Create a Game'
				visible={modalOpen}
				onClose={() => setModalOpen(false)}
			>
				<CreateGameForm />
			</Modal>
		</>
	)
}
