type PlayerHandProps = {
	children: React.ReactNode
}

export default function PlayerHand(props: PlayerHandProps) {
	return (
		<div className='flex items-center mt-auto space-x-4'>{props.children}</div>
	)
}
