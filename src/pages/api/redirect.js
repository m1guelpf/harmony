import cookies from 'next-cookies'
import Client from '../../utils/client'

export default (req, res) => {
	if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' })

	const { route } = req.query

	switch (route) {
		case 'profile':
			getProfileURL(req).then((url) => res.redirect(url))
			break

		default:
			return res.status(400).json({ error: 'Bad Request' })
	}
}

const getProfileURL = async (req) => {
	const { accessToken } = cookies({ req })

	if (!accessToken) return '/login'

	Client.setToken(accessToken)

	try {
		const user = await Client.user()

		return `/${user.id}`
	} catch {
		return '/login'
	}
}
