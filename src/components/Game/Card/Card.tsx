// Types
import { GameCard } from '@/types/game.type'
import { IconCards } from '@tabler/icons-react'

// Packages
import classNames from 'classnames'

type CardProps = Pick<GameCard, 'id' | 'type' | 'text'> & {
	onClick?: (card: any) => void
}

const Card: React.FC<CardProps> = (props) => {
	return (
		<button
			onClick={props.onClick}
			className={classNames(
				'h-56 md:h-64 w-44 md:w-52 flex flex-col flex-shrink-0 items-start rounded-lg border p-4 hover:-translate-y-2 hover:shadow-2xl transition-all hover:cursor-pointer',
				{
					'bg-black text-white': props.type === 'black',
				}
			)}
		>
			<p className='text-left'>{props.text}</p>

			<div className='flex items-center mx-auto mt-auto space-x-1 text-neutral-400'>
				<IconCards size={14} />
				<p className='text-[10px] md:text-xs'>Clone Against Humanity</p>
			</div>
		</button>
	)
}

export default Card

type ContainerProps = {
	children: React.ReactNode
	className?: string
}

const CardContainer: React.FC<ContainerProps> = (props) => {
	return (
		<div
			className={classNames(
				'flex gap-4 mx-auto overflow-x-auto w-full',
				props.className
			)}
		>
			{props.children}
		</div>
	)
}

export { CardContainer }
