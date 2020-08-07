import redirectTo from '../utils/redirectTo'
import Cookies from 'js-cookie'

export const WithAuth = async () => {
	if (!Cookies.get('accessToken')) return redirectTo('/login')
}

export const WithGuest = async () => {
	if (Cookies.get('accessToken')) return redirectTo('/home')
}
