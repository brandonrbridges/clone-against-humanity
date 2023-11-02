'use client'

// Components
import HomeHeader from '@/components/HomeHeader'

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className='p-4'>
			<HomeHeader />

			{children}
		</main>
	)
}
