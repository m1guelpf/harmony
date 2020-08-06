const Logo = ({ className }) => (
	<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 515 515">
		<defs>
			<linearGradient id="a" x1="15.754%" x2="81.267%" y1="86.695%" y2="11.55%">
				<stop offset="0%" stopColor="#4158D0" />
				<stop offset="50%" stopColor="#C850C0" />
				<stop offset="100%" stopColor="#FFCC70" />
			</linearGradient>
		</defs>
		<g fill="none" fillRule="evenodd">
			<circle cx="257.5" cy="257.5" r="257.5" fill="url(#a)" />
			<circle cx="257" cy="257" r="195" fill="#FFF" fillOpacity=".3" />
			<circle cx="257.5" cy="257.5" r="145.5" fill="#FFF" fillOpacity=".3" />
			<circle cx="257.5" cy="257.5" r="108.5" fill="#FFF" fillOpacity=".5" />
			<circle cx="257.5" cy="257.5" r="62.5" fill="#FFF" fillOpacity=".8" />
		</g>
	</svg>
)

export default Logo
