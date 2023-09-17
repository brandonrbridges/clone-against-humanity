'use client'

// Recoil
import { useRecoilState, useRecoilValue } from 'recoil'
import { authState } from '@/recoil/authState'

// Components
import TempUsernameField from './TempUsernameField'

export default function TempUsernameBlock() {
	const auth = useRecoilValue(authState)

	if (auth) return null

	return (
		<div className='container p-8 text-white rounded-md bg-zinc-950'>
			<p>Please enter a username</p>
			<p className='mb-4 text-sm text-zinc-400'>
				You will be able to save this username for future games
			</p>
			<TempUsernameField />
		</div>
	)
}
