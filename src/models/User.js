import Adapters from 'next-auth/adapters'

export default class User extends Adapters.TypeORM.Models.User.model {
	constructor(name, email, image, emailVerified, accessToken, refreshToken) {
		super(name, email, image, emailVerified, accessToken, refreshToken)
	}
}

export const UserSchema = {
	name: 'User',
	target: User,
	columns: {
		...Adapters.TypeORM.Models.User.schema.columns,
	},
}
