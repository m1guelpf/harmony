import Head from 'next/head'
import { usePageLayout } from '../components/PageLayout'
import { WithAuth } from '../middleware/auth'
import { useSession } from 'next-auth/client'
import Link from 'next/link'

const Home = () => {
	const [session] = useSession()

	return (
		<div className="container">
			<Head>
				<title>Harmony</title>
			</Head>

			{session ? (
				<div>
					WIP. Go to{' '}
					<Link href="/[username]" as={`/${session.user.username}`}>
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
Home.middleware = [WithAuth]

export default Home
