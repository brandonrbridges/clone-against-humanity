// Next
import Link from 'next/link'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className='flex items-start'>
			<div className='w-56 p-4 border rounded'>
				<p className='mb-2 font-medium'>Administration</p>
				<ul className='space-y-0.5'>
					<li>
						<Link href='/admin'>Dashboard</Link>
					</li>
					<li>
						<Link href='/admin/cards'>Cards</Link>
					</li>
					<li>
						<Link href='/admin/users'>Users</Link>
					</li>
				</ul>

				<Link href='/'>
					<button className='w-full mt-4 button'>Go Home</button>
				</Link>
			</div>

			<div className='ml-8 grow'>{children}</div>
		</main>
	)
}
