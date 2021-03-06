import { useState } from 'react'
import BaseLayout from './BaseLayout'
import Transition from './Transition'
import Logo from './Logo'
import Avatar from './Avatar'
import useUser from '../hooks/session'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { ThemeToggle } from './ThemeManager'

const PageLayout = ({ children, ...pageProps }) => {
	const user = useUser()
	const [isProfileMenuOpen, setProfileMenuOpen] = useState(false)

	const signOut = () => {
		Cookies.remove('accessToken', { expires: 2628000, sameSite: 'lax' })

		window.location = '/login'
	}

	return (
		<BaseLayout {...pageProps}>
			<div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900">
				<div className="flex flex-col w-0 flex-1 overflow-hidden">
					<div className="relative z-10 flex-shrink-0 flex justify-between h-16 bg-white dark:bg-gray-800 shadow">
						<Link href="/">
							<a className="pl-4 flex items-center">
								<Logo className="h-10 w-10" />
								<span className="ml-2 font-medium text-2xl dark:text-gray-200">Harmony</span>
							</a>
						</Link>
						{user ? (
							<div className="mr-4 flex items-center md:mr-6">
								<ThemeToggle />
								<div className="ml-3 relative">
									<button onClick={() => setProfileMenuOpen((state) => !state)} className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline" id="user-menu" aria-label="User menu" aria-haspopup="true">
										<Avatar className="h-8 w-8" src={user.avatar} />
									</button>
									<Transition show={isProfileMenuOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
										<div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
											<div className="py-1 rounded-md bg-white dark:bg-gray-900 shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
												<Link href="/[username]" as={`/${user.id}`}>
													<a className="w-full block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark-hover:bg-gray-800 transition ease-in-out duration-150" role="menuitem">
														Your Profile
													</a>
												</Link>
												<button onClick={() => signOut()} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark-hover:bg-gray-800 transition ease-in-out duration-150" role="menuitem">
													Sign out
												</button>
											</div>
										</div>
									</Transition>
								</div>
							</div>
						) : (
							<Link href="/login">
								<a className="text-center mr-2 px-4 my-3 flex items-center border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-700 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-50 dark-hover:bg-indigo-800 focus:outline-none focus:shadow-outline-indigo transition ease-in-out duration-150">Log In</a>
							</Link>
						)}
					</div>

					<main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex={0}>
						<div className="pt-2 pb-6 md:py-6">
							<div id="alerts" />
							<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
								<div className="py-4">{children}</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</BaseLayout>
	)
}

export const usePageLayout = () => (page, pageProps) => <PageLayout {...pageProps}>{page}</PageLayout>

export default PageLayout
