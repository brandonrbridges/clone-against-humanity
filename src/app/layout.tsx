// Types
import type { Metadata } from 'next'

// Providers
import Providers from './providers'

// Fonts
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// Styles
import './main.scss'

export const metadata: Metadata = {
	title: 'Cards Against Humanity',
	description: 'A fun clone of Cards Against Humanity',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Providers>
			<html lang='en'>
				<body className={inter.className}>
					{children}
					<div id='modal-root' />
				</body>
			</html>
		</Providers>
	)
}
