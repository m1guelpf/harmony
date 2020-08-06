import mysql from 'mysql'
import { PrismaClient } from '@prisma/client'

export const getConnection = () => {
	let prisma

	if (process.env.NODE_ENV === 'production') {
		prisma = new PrismaClient()
	} else {
		if (!global.prisma) {
			global.prisma = new PrismaClient()
		}
		prisma = global.prisma
	}

	return prisma
}

export const getAccountFromSession = async (session) => {
	const prisma = await getConnection()

	const { Account } = await prisma.session.findOne({
		where: { accessToken: session.accessToken },
		include: { Account: true },
	})

	return Account
}

export const getProfileFromUsername = async (username) => {
	console.log({ username })
	const prisma = await getConnection()

	const data = await prisma.account.findOne({
		where: { providerAccountId: username },
		include: { User: true },
	})

	if (!data) throw new Error('User does not exist')

	const { User, accessToken, ...Account } = data

	return { accessToken, account: Account, ...User }
}

export const saveNewAccessTokenToSession = async ({ id, accessToken }) => {
	const connection = mysql.createConnection(process.env.DB_URL)

	return new Promise((resolve, reject) => {
		connection.query(`UPDATE accounts SET access_token = '${accessToken}' WHERE id = ${id};`, (err, result) => {
			if (err) return reject(err)

			resolve()
		})
	})
}
