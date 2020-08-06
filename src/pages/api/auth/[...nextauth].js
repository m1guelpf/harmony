import NextAuth from 'next-auth'
import { Spotify } from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { getAccountFromSession } from '../../../utils/db'
import { PrismaClient } from '@prisma/client'

let prisma

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient()
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient()
	}
	prisma = global.prisma
}

const options = {
	providers: [
		Spotify({
			clientId: process.env.SPOTIFY_ID,
			clientSecret: process.env.SPOTIFY_SECRET,
			scope: 'user-read-email user-top-read',
		}),
	],
	adapter: Adapters.Prisma.Adapter({
		prisma,
		modelMapping: {
			Session: 'nextSession',
			User: 'nextUser',
			Account: 'nextAccount',
			VerificationRequest: 'verificationRequest',
		},
	}),
	callbacks: {
		redirect: async (url, baseUrl) => {
			return url.startsWith(baseUrl) || url[0] === '/' ? Promise.resolve(url) : Promise.resolve(baseUrl)
		},
		session: async (session) => {
			const account = await getAccountFromSession(session)

			session.user.username = account.providerAccountId

			return Promise.resolve(session)
		},
	},
}

export default (req, res) => NextAuth(req, res, options)
