import '../scss/app.scss'
import Error from 'next/error'
import { useBaseLayout } from '../components/BaseLayout'
import Head from 'next/head'

const MyApp = ({ Component, pageProps }) => {
	const getLayout = Component.getLayout || useBaseLayout()

	if (pageProps.error) return <Error {...pageProps.error} />

	return (
		<>
			<Head>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
			</Head>
			{getLayout(<Component {...pageProps} />, { ...pageProps, middleware: Component.middleware ?? [] })}
		</>
	)
}

export default MyApp
