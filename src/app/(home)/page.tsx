import GameList from '@/components/GameList'
import UsernameEntry from '@/components/UsernameEntry'
import Image from 'next/image'

export default function Home() {
	return (
		<main className='space-y-4'>
			<UsernameEntry />
			<GameList />
		</main>
	)
}
