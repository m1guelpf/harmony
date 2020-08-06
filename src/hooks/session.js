import useSWR from 'swr'
import Client from '../utils/client'

const useSession = () => {
	const { data: session } = useSWR('user', () => Client.user())

	return session
}

export default useSession
