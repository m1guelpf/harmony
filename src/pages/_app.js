import '../scss/app.scss'
import { useBaseLayout } from '../components/BaseLayout'

const MyApp = ({ Component, pageProps }) => {
	const getLayout = Component.getLayout || useBaseLayout()

	return getLayout(<Component {...pageProps} />, Component.middleware ?? [])
}

export default MyApp
