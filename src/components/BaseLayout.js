import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Pipeline from 'pipeline-js'
import { Provider, useSession } from 'next-auth/client'

const BaseLayout = ({ middleware, children }) => {
	const router = useRouter()
	const [session] = useSession()

	useEffect(() => {
		new Pipeline(middleware).process()
	}, [router.pathname])

	return <Provider session={session}>{children}</Provider>
}

export const useBaseLayout = () => (page, pageProps) => <BaseLayout {...pageProps}>{page}</BaseLayout>

export default BaseLayout
