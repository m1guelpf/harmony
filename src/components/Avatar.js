import { memo } from 'react'
import Skeleton from './Skeleton'

const Avatar = ({ src, className = '', lazy, children }) => {
	return (
		<div className={`group rounded-full relative ${className}`}>
			{src ? <img loading={lazy ? 'lazy' : 'auto'} className={`${className} rounded-full overflow-hidden`} src={src} alt="" /> : <Skeleton circle={true} className={`block relative z-1 ${className}`} />}
			{children}
		</div>
	)
}

export default memo(Avatar)
