// Types
import { AuthRolesEnum } from '@/redux/types/auth.types'

// Next
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Redux
import { useAppSelector } from '@/redux/store'

const AdminButton: React.FC = () => {
	const auth = useAppSelector(({ auth }) => auth)

	const pathname = usePathname()

	if (!auth.roles.includes(AuthRolesEnum.ADMINISTRATOR)) return null

	if (pathname.includes('admin')) return null

	return (
		<Link href='/admin'>
			<button className='button'>Administrator</button>
		</Link>
	)
}

export default AdminButton
