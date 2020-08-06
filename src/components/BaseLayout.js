import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Pipeline from 'pipeline-js'

const BaseLayout = ({ middleware, children }) => {
	const router = useRouter()

	useEffect(() => {
		new Pipeline(middleware).process()
	}, [router.pathname])

	return children
}

export const useBaseLayout = () => (page, middleware) => <BaseLayout middleware={middleware}>{page}</BaseLayout>

export default BaseLayout
