import { IconCircleX } from '@tabler/icons-react'
import { createPortal } from 'react-dom'

type ModalProps = {
	title: string
	children: React.ReactNode
	visible: boolean
	onClose: () => void
}

const Modal: React.FC<ModalProps> = (props) => {
	if (!props.visible) return null

	return createPortal(
		<div className='fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black/25'>
			<div className='w-10/12 p-6 bg-white rounded md:w-1/3'>
				<div className='flex items-center justify-between mb-4'>
					<p className='font-semibold'>{props.title}</p>
					<button onClick={props.onClose}>
						<IconCircleX />
					</button>
				</div>
				<div>{props.children}</div>
			</div>
		</div>,
		document.getElementById('modal-root') as HTMLElement
	)
}

export default Modal
