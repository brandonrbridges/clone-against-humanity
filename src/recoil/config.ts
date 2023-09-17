import { recoilPersist } from 'recoil-persist'

const sessionStorage =
	typeof window !== 'undefined' ? window.sessionStorage : undefined

const { persistAtom } = recoilPersist({
	key: 'cloneagainsthumanity',
	storage: sessionStorage,
})

export { persistAtom }
