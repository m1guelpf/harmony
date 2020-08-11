import { usePageLayout } from '../components/PageLayout'
import Link from 'next/link'
import useSWR from 'swr'
import Client from '../utils/client'
import Skeleton from '../components/Skeleton'
import { StarSolid, UserCircleSolid } from '../components/Icon'
import { Portal } from 'react-portal'
import useUser from '../hooks/session'

const Home = () => {
	const { data: profiles } = useSWR('/api/profiles', () => Client.profiles())
	const user = useUser()

	return (
		<>
			{user && (!user.name || !user.avatar) && (
				<Portal node={typeof document !== 'undefined' && document.getElementById('alerts')}>
					<div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-700 p-4">
						<div className="flex">
							<div className="flex-shrink-0">
								<UserCircleSolid className="w-5 h-5 text-yellow-400 dark:text-yellow-500" />
							</div>
							<div className="ml-3">
								<p className="text-sm leading-5 text-yellow-700 dark:text-yellow-400">
									You haven't added {!user.name && 'a name'}
									{!user.name && !user.avatar && ' or '}
									{!user.avatar && 'a profile picture'} to your Spotify account. If you want others to recognize you, we recommend doing so.{' '}
									<a href="https://newsroom.spotify.com/2020-03-10/how-to-customize-and-share-your-spotify-profile/" target="_blank" rel="noopener noreferrer" className="font-medium underline text-yellow-700 dark:text-yellow-300 hover:text-yellow-600 transition ease-in-out duration-150">
										Here's how to do it
									</a>
									.
								</p>
							</div>
						</div>
					</div>
				</Portal>
			)}
			<div className="container">
				<div>
					<div className="flex items-center justify-between mb-2">
						<p className="text-xl font-medium dark:text-gray-300">Users</p>
					</div>
					<div className="grid gap-4 grid-cols-3 sm:grid-cols-5 grid-flow-row">{profiles ? profiles.map(({ id, name, avatar }, i) => <Profile key={id} username={id} name={name} avatar={avatar} isFirst={i === 0} />) : [...Array(10).keys()].map((id) => <Profile key={id} />)}</div>
				</div>
			</div>
		</>
	)
}

const Profile = ({ username, name, avatar, isFirst = false }) => {
	const LinkOrDiv = username ? Link : 'div'

	return (
		<LinkOrDiv href="/[username]" as={`/${username}`}>
			<a className="flex flex-col items-start sm:mb-4">
				<div className="relative">
					{username ? <div className="p-4 rounded-lg w-24 h-24 bg-cover bg-indigo-300 dark:bg-indigo-900" style={{ backgroundImage: `url(${avatar || '/img/avatar.png'})`, boxShadow: 'inset 0 0 0 -1px black' }} /> : <Skeleton className="w-24 h-24" />}
					{isFirst && (
						<div className="absolute top-0 inset-x-0 -mt-2.5">
							<span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 dark:bg-gray-700 text-indigo-800 dark:text-gray-300">
								<StarSolid className="-ml-1 mr-1.5 h-4 w-4 text-indigo-400 dark:text-gray-400" />
								Featured
							</span>
						</div>
					)}
				</div>
				<p className="mt-1 text-center text-sm dark:text-gray-400 w-full">{name || <Skeleton />}</p>
			</a>
		</LinkOrDiv>
	)
}

Home.getLayout = usePageLayout()

export default Home
