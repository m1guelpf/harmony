import Head from 'next/head'
import { usePageLayout } from '../components/PageLayout'
import { WithAuth } from '../middleware/auth'
import { useSession } from 'next-auth/client'

const Home = () => {
	const [session] = useSession()

	console.log(session)
	return (
		<div className="container">
			<Head>
				<title>Harmony</title>
			</Head>

			<div>Welcome to Harmony</div>
		</div>
	)
}

Home.getLayout = usePageLayout()
Home.middleware = [WithAuth]

export default Home
