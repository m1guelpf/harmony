import { getSession } from 'next-auth/client'
import axios from 'axios'
import { getAccessTokenFromSession } from '../../../utils/db'

export default async (req, res) => {
	const { type, timeRange } = req.query

	const session = await getSession({ req })

	if (!session) return res.status(401)

	const { id: accountID, access_token: accessToken, refresh_token: refreshToken } = await getAccessTokenFromSession(session)

	axios
		.get(`https://api.spotify.com/v1/me/top/${type}?limit=50&time_range=${timeRange}`, {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
		.then(
			({ data: response }) => res.status(200).json(response),
			(error) => res.status(error.response.status).json(error.response.data)
		)
}
