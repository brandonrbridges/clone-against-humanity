// Styles
import './Card.scss'

// Icons
import { IconCardsFilled } from '@tabler/icons-react'

// Packages
import classNames from 'classnames'

type CardProps = {
	type: 'white' | 'black'
	data: string
}

export default function Card(props: CardProps) {
	return (
		<div
			className={classNames('card', {
				white: props.type === 'white',
				black: props.type === 'black',
			})}
		>
			<div>{props.data}</div>
			<div className='mt-auto'>
				<div className='flex items-center space-x-2 text-xs'>
					<IconCardsFilled size={18} stroke={0.5} />
					<p>Clone Against Humanity</p>
				</div>
			</div>
		</div>
	)
}
