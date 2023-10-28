// Next
import type { Metadata } from 'next'

// Redux
import ReduxProvider from '@/redux/provider'

// Fonts
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// Styles
import '@/styles/main.scss'

export const metadata: Metadata = {
	title: 'Clone Against Humanity',
	description: '',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ReduxProvider>{children}</ReduxProvider>
				<div id='modal-root' />
			</body>
		</html>
	)
}
