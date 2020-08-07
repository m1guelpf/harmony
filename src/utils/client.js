import axios from 'axios'
import Cookies from 'js-cookie'
import { Agent } from 'https'

class Client {
	constructor() {
		this.apiToken = Cookies.get('accessToken')

		this.client = axios.create({
			withCredentials: true,
			httpsAgent: new Agent({
				rejectUnauthorized: false,
			}),
			headers: {
				...(this.apiToken ? { Authorization: `Bearer ${this.apiToken}` } : {}),
			},
			baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
		})

		this.client.interceptors.response.use((response) => response.data)
	}

	startSession() {
		return this.client.get('/sanctum/csrf-cookie')
	}

	user() {
		return this.client.get('/api/user')
	}

	profile(username) {
		return this.client.get(`/api/profile/${username}`)
	}

	profiles() {
		return this.client.get('/api/profiles')
	}

	stats({ type, period, username }) {
		return this.client.get(`/api/spotify/top/${type}/${period}/${username}`)
	}

	setToken(token) {
		this.apiToken = token

		this.client.defaults.headers.Authorization = `Bearer ${token}`
	}
}

export default new Client()
