import redirectTo from '../utils/redirectTo'
import axios from 'axios'

export const WithAuth = async () => {
	const session = await getSession()

	if (Object.keys(session).length === 0) return redirectTo('/login')
}

export const WithGuest = async () => {
	const session = await getSession()

	if (Object.keys(session).length !== 0) return redirectTo('/home')
}

const getSession = () => {
	return axios.get('/api/auth/session').then((res) => res.data)
}
