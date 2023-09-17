import useHydration from '@/hooks/useHydration'
import { createPortal } from 'react-dom'

type ModalProps = {
	title?: string
	children: React.ReactNode
	visible: boolean
	onClose: () => void
}

export default function Modal(props: ModalProps) {
	const hydrated = useHydration()

	if (!props.visible || !hydrated) return null

	const root = document.getElementById('modal-root') as HTMLElement

	return createPortal(
		<div className='absolute top-0 left-0 flex items-center justify-center w-full h-screen bg-zinc-950/50'>
			<div className='w-full max-w-lg p-4 bg-white rounded-md shadow-xl'>
				{props.title && <p className='mb-4 text-xl font-bold'>{props.title}</p>}

				{props.children}
			</div>
		</div>,
		root
	)
}
