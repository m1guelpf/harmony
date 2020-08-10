import { usePageLayout } from '../components/PageLayout'
import Link from 'next/link'
import useSWR from 'swr'
import Client from '../utils/client'
import Skeleton from '../components/Skeleton'

const Home = () => {
	const { data: profiles } = useSWR('/api/profiles', () => Client.profiles())

	return (
		<div className="container">
			<div>
				<div className="flex items-center justify-between mb-2">
					<p className="text-xl font-medium dark:text-gray-300">Users</p>
				</div>
				<div className="grid gap-4 grid-cols-3 sm:grid-cols-5 grid-flow-row">{profiles ? profiles.map(({ id, name, avatar }) => <Profile key={id} username={id} name={name} avatar={avatar} />) : [...Array(10).keys()].map((id) => <Profile key={id} />)}</div>
			</div>
		</div>
	)
}

const Profile = ({ username, name, avatar }) => {
	const LinkOrDiv = username ? Link : 'div'

	return (
		<LinkOrDiv href="/[username]" as={`/${username}`}>
			<a className="flex flex-col items-start sm:mb-4">
				{avatar ? <div className="bg-white p-4 rounded-lg w-24 h-24 bg-cover" style={{ backgroundImage: `url(${avatar})` }} /> : <Skeleton className="w-24 h-24" />}
				<p className="mt-1 text-center text-sm dark:text-gray-400">{name || <Skeleton />}</p>
			</a>
		</LinkOrDiv>
	)
}

Home.getLayout = usePageLayout()

export default Home
