import redirectTo from '../utils/redirectTo'
import Client from '../utils/client'

export const WithAuth = async () => {
	Client.user().catch((error) => {
		if (error.response.status === 401) return redirectTo('/login')
	})
}

export const WithGuest = async () => {
	Client.user()
		.then(() => redirectTo('/home'))
		.catch(() => {})
}
