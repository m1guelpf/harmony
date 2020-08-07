import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Pipeline from 'pipeline-js'
import Cookies from 'js-cookie'
import Client from '../utils/client'
import ThemeManager from './ThemeManager'

const BaseLayout = ({ middleware, children }) => {
	const router = useRouter()

	if (router.query.apiToken) {
		Cookies.set('accessToken', router.query.apiToken, { expires: 2628000, sameSite: 'lax' })
		Client.setToken(router.query.apiToken)
	}

	useEffect(() => {
		new Pipeline(middleware).process()
	}, [router.pathname])

	return <ThemeManager>{children}</ThemeManager>
}

export const useBaseLayout = () => (page, pageProps) => <BaseLayout {...pageProps}>{page}</BaseLayout>

export default BaseLayout
