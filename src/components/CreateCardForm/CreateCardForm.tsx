// Fetch
import { POST } from '@/lib/fetch'

// Icons
import { IconCirclePlus } from '@tabler/icons-react'

// Packages
import { useForm } from 'react-hook-form'

type CreateCardFormProps = {
	type?: 'white' | 'black'
	onClose: () => void
	updateState: (card: any) => void
}

const CreateCardForm: React.FC<CreateCardFormProps> = (props) => {
	const { register, handleSubmit, reset, watch, getValues, setValue } = useForm(
		{
			defaultValues: {
				type: props.type || 'white',
				text: '',
			},
		}
	)

	const onSubmit = handleSubmit(async (data) => {
		const card = await POST('/cards', {
			...data,
			gap_count: 1,
		})

		reset()

		props.updateState(card)
		props.onClose()
	})

	const insertGap = () => {
		const text = getValues('text')
		const gap = '______'

		const updatedText = text + gap

		setValue('text', updatedText)
	}

	const watchedType = watch('type')

	return (
		<form onSubmit={onSubmit} className='space-y-4'>
			<div className='flex items-center space-x-4'>
				<div className='flex items-center pl-4 border border-gray-200 rounded grow'>
					<input
						id='white_card'
						type='radio'
						value='white'
						className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
						{...register('type')}
					/>
					<label
						htmlFor='white_card'
						className='w-full py-2.5 ml-2 text-sm font-medium text-gray-900'
					>
						White Card
					</label>
				</div>
				<div className='flex items-center pl-4 border border-gray-200 rounded grow'>
					<input
						id='black_card'
						type='radio'
						value='black'
						className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
						{...register('type')}
					/>
					<label
						htmlFor='black_card'
						className='w-full py-2.5 ml-2 text-sm font-medium text-gray-900'
					>
						Black Card
					</label>
				</div>
			</div>
			<div>
				<label htmlFor='text'>Text</label>
				<input
					id='text'
					type='text'
					className='input'
					autoFocus
					{...register('text')}
				/>
			</div>
			<div className='flex items-center'>
				{watchedType === 'black' && (
					<button type='button' className='button' onClick={insertGap}>
						Insert Gap
					</button>
				)}
				<button type='submit' className='ml-auto button button-filled'>
					Create Card
					<IconCirclePlus />
				</button>
			</div>
		</form>
	)
}

export default CreateCardForm
