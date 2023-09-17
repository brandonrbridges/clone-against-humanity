// Next
import Link from 'next/link'

export default function NoGameNotice() {
	return (
		<div className='flex items-center justify-center w-full h-screen'>
			<div className='flex flex-col items-center space-y-4'>
				<p>No Game ID provided</p>
				<Link href='/'>
					<button>Back to Home</button>
				</Link>
			</div>
		</div>
	)
}
