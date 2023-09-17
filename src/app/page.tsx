// Components
import { Header } from '@/components/Home'
import LobbyList from '@/components/LobbyList'
import { TempUsernameBlock } from '@/components/TempUsernameField'

export default function Home() {
	return (
		<div>
			<Header />

			<div className='mt-8 space-y-8'>
				<TempUsernameBlock />

				<div className='container'>
					<LobbyList />
				</div>
			</div>
		</div>
	)
}
