const Icon = ({ className, children, isSolid = true }) => (
	<svg viewBox={isSolid ? '0 0 20 20' : '0 0 24 24'} className={`${isSolid ? 'fill-current' : 'fill-none stroke-current stroke-2'} ${className}`} strokeLinecap="round" strokeLinejoin="round" fillRule="evenodd" clipRule="evenodd">
		{children}
	</svg>
)

export const MoonSolid = ({ className }) => (
	<Icon className={className} isSolid={true}>
		<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
	</Icon>
)

export const SunSolid = ({ className }) => (
	<Icon className={className} isSolid={true}>
		<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
	</Icon>
)

export const AnimatedLoading = ({ className }) => (
	<svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" className={`fill-current block ${className}`}>
		<circle cx="15" cy="15" r="11.9857">
			<animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" />
			<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
		</circle>
		<circle cx="60" cy="15" r="12.0143" fillOpacity="0.3">
			<animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite" />
			<animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite" />
		</circle>
		<circle cx="105" cy="15" r="11.9857">
			<animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" />
			<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
		</circle>
	</svg>
)
