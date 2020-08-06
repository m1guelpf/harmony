import NextAuth from 'next-auth'
import { Spotify } from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import models from '../../../models'

const options = {
	providers: [
		Spotify({
			clientId: process.env.SPOTIFY_ID,
			clientSecret: process.env.SPOTIFY_SECRET,
			scope: 'user-read-email user-top-read',
		}),
	],
	adapter: Adapters.TypeORM.Adapter(
		// The first argument should be a database connection string or TypeORM config object
		process.env.DB_URL,
		// The second argument can be used to pass custom models and schemas
		{
			customModels: {
				User: models.User,
				Account: models.Account,
			},
		}
	),
}

export default (req, res) => NextAuth(req, res, options)
