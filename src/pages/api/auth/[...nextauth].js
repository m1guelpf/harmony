import NextAuth from 'next-auth'
import { Spotify } from 'next-auth/providers'

const options = {
	providers: [
		Spotify({
			clientId: process.env.SPOTIFY_ID,
			clientSecret: process.env.SPOTIFY_SECRET,
		}),
	],
	// database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options)
