import axios from 'axios'
import qs from 'qs'
import { saveNewAccessTokenToSession, getProfileFromUsername } from '../../../utils/db'

export default async (req, res) => {
	const { type, timeRange, username } = req.query

	if (!username) return res.status(404).json({ error: 'User Not Found' })

	try {
		const {
			account: { id: accountID, accessToken, refreshToken },
		} = await getProfileFromUsername(username)

		returnSpotifyResponse({ res, accessToken, type, timeRange, accountID, refreshToken })
	} catch (e) {
		if (e.message === 'User does not exist') return res.status(404).json({ error: 'User Not Found' })

		return res.status(500).json({ error: 'Server Error' })
	}
}

const returnSpotifyResponse = ({ res, accessToken, type, timeRange, accountID, refreshToken }) =>
	axios
		.get(`https://api.spotify.com/v1/me/top/${type}?limit=50&time_range=${timeRange}`, {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
		.then(
			({ data: response }) => res.status(200).json(response),
			async (error) => {
				if (error.response.status !== 401 && error.response.data.message !== 'The access token expired') res.status(error.response.status).json(error.response.data)

				accessToken = await refreshAccessToken({ refreshToken, res })

				await saveNewAccessTokenToSession({ id: accountID, accessToken })

				returnSpotifyResponse({ res, accessToken, type, timeRange, accountID, refreshToken })
			}
		)

const refreshAccessToken = ({ refreshToken, res }) =>
	axios
		.post(
			'https://accounts.spotify.com/api/token',
			qs.stringify({
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
			}),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${base64_encode(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`)}`,
				},
			}
		)
		.then(
			({ data: response }) => response.access_token,
			(error) => res.status(error.response.status).json(error.response.data)
		)

const base64_encode = (data) => {
	const buffer = new Buffer.from(data)

	return buffer.toString('base64')
}
