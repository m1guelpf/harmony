const withPWA = require('next-pwa')
const runtimeCaching = require('./cache.config')

module.exports = withPWA({
	pwa: {
		disable: process.env.NODE_ENV === 'development',
		dest: 'public',
		runtimeCaching,
	},
})
