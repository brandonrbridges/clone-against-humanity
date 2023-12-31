import useToggle from '@/hooks/useToggle'
import { IconCirclePlus } from '@tabler/icons-react'
import Modal from '../Modal'
import CreateCardForm from '../CreateCardForm'
import { useEffect } from 'react'

type CreateCardButtonProps = {
	text?: string
	type?: 'white' | 'black'
	updateState: (card: any) => void
}

const CreateCardButton: React.FC<CreateCardButtonProps> = (props) => {
	const [visible, toggle] = useToggle()

	return (
		<>
			<button className='button' onClick={toggle}>
				{props.text || 'Create Card'}
				<IconCirclePlus />
			</button>

			{visible && (
				<Modal title='Create Card' visible={visible} toggle={toggle}>
					<CreateCardForm
						type={props.type}
						toggle={toggle}
						updateState={props.updateState}
					/>
				</Modal>
			)}
		</>
	)
}

export default CreateCardButton
