import redirectTo from '../utils/redirectTo'
import axios from 'axios'

export const WithAuth = () => {
	const session = getSession()

	if (!session) return redirectTo('/login')
}

export const WithGuest = () => {
	const session = getSession()

	console.log({ session })

	if (session) return redirectTo('/home')
}

const getSession = () => {
	return axios.get('/api/auth/session').then((res) => res.data)
}
