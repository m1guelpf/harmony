import mysql from 'mysql'

export const getAccessTokenFromSession = async (session) => {
	const connection = mysql.createConnection(process.env.DB_URL)

	await new Promise((resolve, reject) => {
		connection.connect((err) => {
			if (err) return reject(err)

			resolve()
		})
	})

	return new Promise((resolve, reject) => {
		connection.query(`SELECT sessions.user_id, accounts.access_token, accounts.id, accounts.refresh_token from sessions INNER JOIN accounts ON sessions.user_id = accounts.user_id WHERE sessions.access_token = '${session.accessToken}';`, (err, result) => {
			if (err) return reject(err)

			resolve(Object.assign({}, result[0]))
		})
	})
}

export const saveNewAccessTokenToSession = async ({ id, accessToken }) => {
	const connection = mysql.createConnection(process.env.DB_URL)

	await new Promise((resolve, reject) => {
		connection.connect((err) => {
			if (err) return reject(err)

			resolve()
		})
	})

	return new Promise((resolve, reject) => {
		connection.query(`UPDATE accounts SET access_token = '${accessToken}' WHERE id = ${id};`, (err, result) => {
			if (err) return reject(err)

			resolve()
		})
	})
}
