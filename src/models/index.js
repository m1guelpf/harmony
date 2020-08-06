import User, { UserSchema } from './User'
import { Account, AccountSchema } from 'next-auth/dist/adapters/typeorm/models/account'

export default {
	User: {
		model: User,
		schema: UserSchema,
	},
	Account: {
		model: Account,
		schema: AccountSchema,
	},
}
