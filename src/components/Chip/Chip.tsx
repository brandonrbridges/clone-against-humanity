type ChipProps = {
	children: React.ReactNode
}

const Chip: React.FC<ChipProps> = (props) => {
	return (
		<span className='block px-2 text-sm rounded-full bg-neutral-200'>
			{props.children}
		</span>
	)
}

export default Chip
