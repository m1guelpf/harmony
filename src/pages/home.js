import Head from 'next/head'
import { usePageLayout } from '../components/PageLayout'
import { WithAuth } from '../middleware/auth'
import Link from 'next/link'
import useUser from '../hooks/session'

const Home = () => {
	const user = useUser()

	return (
		<div className="container">
			<Head>
				<title>Harmony</title>
			</Head>

			{user ? (
				<div>
					WIP. Go to{' '}
					<Link href="/[username]" as={`/${user.id}`}>
						<a className="underline">your profile</a>
					</Link>
					.
				</div>
			) : (
				<span>Wait a second</span>
			)}
		</div>
	)
}

Home.getLayout = usePageLayout()
// Home.middleware = [WithAuth]

export default Home
