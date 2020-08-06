import Head from 'next/head'
import { usePageLayout } from '../components/PageLayout'
import { WithAuth } from '../middleware/auth'

const Home = () => {
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
