import { getSession } from 'next-auth/client'
import useSWR from 'swr'

const useSession = () => {
	const { data: session } = useSWR('session', getSession)

	return session
}

export default useSession
