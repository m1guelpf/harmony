module.exports = {
	purge: ['./src/**/*.{js,mdx}', './next.config.js'],
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [require('@tailwindcss/ui')],
}
