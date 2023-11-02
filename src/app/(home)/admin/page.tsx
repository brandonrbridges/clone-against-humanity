import Link from 'next/link'

export default function Admin() {
	return (
		<div>
			<div className='w-full p-4 mb-4 space-y-1 text-white bg-black rounded'>
				<p className='font-medium'>
					Welcome to the Administration Panel for Clone Against Humanity.
				</p>
				<p className='text-sm'>
					Please use the sidebar to navigate the different options available.
				</p>
			</div>
		</div>
	)
}
