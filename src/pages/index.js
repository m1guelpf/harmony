import { usePageLayout } from '../components/PageLayout'
import Link from 'next/link'
import useSWR from 'swr'
import Client from '../utils/client'
import Skeleton from '../components/Skeleton'
import { StarSolid } from '../components/Icon'

const Home = () => {
	const { data: profiles } = useSWR('/api/profiles', () => Client.profiles())

	return (
		<div className="container">
			<div>
				<div className="flex items-center justify-between mb-2">
					<p className="text-xl font-medium dark:text-gray-300">Users</p>
				</div>
				<div className="grid gap-4 grid-cols-3 sm:grid-cols-5 grid-flow-row">{profiles ? profiles.map(({ id, name, avatar }, i) => <Profile key={id} username={id} name={name} avatar={avatar} isFirst={i === 0} />) : [...Array(10).keys()].map((id) => <Profile key={id} />)}</div>
			</div>
		</div>
	)
}

const Profile = ({ username, name, avatar, isFirst = false }) => {
	const LinkOrDiv = username ? Link : 'div'

	return (
		<LinkOrDiv href="/[username]" as={`/${username}`}>
			<a className="flex flex-col items-start sm:mb-4">
				<div className="relative">
					{avatar ? <div className="bg-white p-4 rounded-lg w-24 h-24 bg-cover" style={{ backgroundImage: `url(${avatar})` }} /> : <Skeleton className="w-24 h-24" />}
					{isFirst && (
						<div className="absolute top-0 inset-x-0 -mt-2.5">
							<span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 dark:bg-gray-700 text-indigo-800 dark:text-gray-300">
								<StarSolid className="-ml-1 mr-1.5 h-4 w-4 text-indigo-400 dark:text-gray-400" />
								Featured
							</span>
						</div>
					)}
				</div>
				<p className="mt-1 text-center text-sm dark:text-gray-400">{name || <Skeleton />}</p>
			</a>
		</LinkOrDiv>
	)
}

Home.getLayout = usePageLayout()

export default Home
