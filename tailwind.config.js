const plugin = require('tailwindcss/plugin')
const selectorParser = require('postcss-selector-parser')

module.exports = {
	purge: ['./src/**/*.{js,mdx}', './next.config.js'],
	theme: {
		extend: {},
	},
	variants: {
		backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover'],
		textColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover'],
		borderColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover'],
	},
	plugins: [
		plugin(function ({ addVariant, prefix, e }) {
			addVariant('dark', ({ modifySelectors, separator }) => {
				modifySelectors(({ selector }) => {
					return selectorParser((selectors) => {
						selectors.walkClasses((sel) => {
							sel.value = `dark${separator}${sel.value}`
							sel.parent.insertBefore(sel, selectorParser().astSync(prefix('.scheme-dark ')))
						})
					}).processSync(selector)
				})
			})
			addVariant('dark-hover', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.scheme-dark .${e(`dark-hover${separator}${className}`)}:hover`
				})
			})
		}),
		require('@tailwindcss/ui'),
	],
}
