import '../scss/app.scss'
import Error from 'next/error'
import { useBaseLayout } from '../components/BaseLayout'

const MyApp = ({ Component, pageProps }) => {
	const getLayout = Component.getLayout || useBaseLayout()

	if (pageProps.error) return <Error {...pageProps.error} />

	return getLayout(<Component {...pageProps} />, { ...pageProps, middleware: Component.middleware ?? [] })
}

export default MyApp
