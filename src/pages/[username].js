import { usePageLayout } from '../components/PageLayout'
import Avatar from '../components/Avatar'
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import Transition from '../components/Transition'
import Skeleton from '../components/Skeleton'
import useUser from '../hooks/session'
import Link from 'next/link'
import Client from '../utils/client'
import cookies from 'next-cookies'
import { MusicNoteSolid, ShareSolid, ShareOutline } from '../components/Icon'
import QRCode from 'qrcode'
import useTheme from '../hooks/theme'
import { Portal } from 'react-portal'

const spotifyPeriods = [
	{ name: 'All Time', value: 'long_term' },
	{ name: 'Last 6 Months', value: 'medium_term' },
	{ name: 'Last Month', value: 'short_term' },
]

const Profile = ({ profile }) => {
	const user = useUser()
	const [shareOpen, setShareOpen] = useState(false)
	const [artistPeriod, setArtistPeriod] = useState(spotifyPeriods[0].value)
	const [songPeriod, setSongPeriod] = useState(spotifyPeriods[0].value)
	const { data: artists } = useSWR(
		() => `stats-artists-${profile.username}-${artistPeriod}`,
		() => Client.stats({ type: 'artists', period: artistPeriod, username: profile.username })
	)
	const { data: songs } = useSWR(
		() => `stats-tracks-${profile.username}-${songPeriod}`,
		() => Client.stats({ type: 'tracks', period: songPeriod, username: profile.username })
	)

	const shareProfile = () => {
		setShareOpen(true)
	}

	return (
		<div>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<a href={`https://open.spotify.com/user/${profile.username}`} target="_blank" rel="noopener noreferrer">
						<Avatar className="w-12 h-12" src={profile.avatar} />
					</a>
					<div className="ml-3">
						<h1 className="text-2xl font-medium text-gray-800 dark:text-gray-300">{profile.name}</h1>
					</div>
				</div>
				<span className="inline-flex rounded-md shadow-sm">
					<button onClick={shareProfile} type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm leading-5 font-medium rounded-md text-gray-700 dark:text-gray-400 bg-white dark:bg-gray-900 hover:text-gray-500 dark-hover:text-gray-200 focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
						<ShareSolid className="w-4 h-4" />
					</button>
				</span>
			</div>
			{!user && (
				<span className="mt-4 w-full inline-flex rounded-md shadow-sm">
					<Link href="/login">
						<a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white dark:bg-gray-200 text-sm leading-5 font-medium text-gray-500 dark:text-gray-700 hover:text-gray-400 dark-hover:text-gray-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
							<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 168 168">
								<path fillRule="evenodd" clipRule="evenodd" d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z" />
							</svg>
							<span className="ml-2">Login with Spotify and check matches</span>
						</a>
					</Link>
				</span>
			)}
			{user && profile.username !== user.id && (
				<span className="mt-4 w-full inline-flex rounded-md shadow-sm">
					<Link href="/match/[username]" as={`/match/${profile.username}`}>
						<a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white dark:bg-gray-200 text-sm leading-5 font-medium text-gray-500 dark:text-gray-700 hover:text-gray-400 dark-hover:text-gray-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
							<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 168 168">
								<path fillRule="evenodd" clipRule="evenodd" d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z" />
							</svg>
							<span className="ml-2">Check the music you have in common</span>
						</a>
					</Link>
				</span>
			)}
			<div className="mt-8">
				<SpotifySection title="Favourite Artists" period={artistPeriod} setPeriod={setArtistPeriod} items={artists} itemParse={({ id, images, name, external_urls: { spotify: href } }) => ({ id, image: images?.[0]?.url, name, href })} emptyMessage="We don't have enough data to calculate this person's favourite artists" />
				<SpotifySection className="mt-4" title="Favourite Songs" period={songPeriod} setPeriod={setSongPeriod} items={songs} itemParse={({ id, album: { images }, name, external_urls: { spotify: href } }) => ({ id, image: images[0].url, name, href })} emptyMessage="We don't have enough data to calculate this person's favourite songs" />
			</div>
			<Portal>
				<ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} url={`https://harmony.report/match/${profile.username}`} />
			</Portal>
		</div>
	)
}

export const SpotifySection = ({ className, title, period, setPeriod, items, itemParse, emptyMessage }) => (
	<div className={className}>
		<div className="flex items-center justify-between mb-2">
			<p className="text-xl font-medium dark:text-gray-300">{title}</p>
			<Dropdown className="flex-1" options={spotifyPeriods} value={period} onChange={setPeriod} />
		</div>
		<div className="flex items-stretch overflow-x-auto space-x-4">{items ? items?.length === 0 ? <EmptyState message={emptyMessage} /> : items.map(itemParse).map(({ id, image, name, href }) => <SpotiftItem key={id} href={href} image={image} name={name} />) : [...Array(10).keys()].map((id) => <SpotiftItem key={id} />)}</div>
	</div>
)

export const EmptyState = ({ message }) => (
	<div className="flex flex-col items-center w-full">
		<MusicNoteSolid className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-1" />
		<span className="text-gray-600 dark:text-gray-400 text-center max-w-xs">{message}</span>
	</div>
)

const Dropdown = ({ options, className = '', value, onChange }) => {
	const [isOpen, setOpen] = useState(false)

	const selectOption = (option) => {
		setOpen(false)

		onChange(option.value)
	}

	return (
		<div className={`relative flex items-center justify-end ${className}`}>
			<button onClick={() => setOpen((state) => !state)} type="button" aria-haspopup="listbox" aria-expanded={isOpen ? 'open' : 'closed'} aria-labelledby="listbox-label" className="cursor-pointer flex items-center pl-1.5 rounded focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
				<span className="text-lg font-medium text-gray-600 dark:text-gray-400">{options.filter((option) => option.value === value)[0].name}</span>
				<span className="pointer-events-none">
					<svg className="h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
						<path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</span>
			</button>
			<Transition show={isOpen} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
				<div className="absolute top-6 right-0 origin-top-right mt-1 w-full rounded-md bg-white dark:bg-gray-900 border border-transparent dark:border-gray-800 shadow-lg">
					<ul tabIndex="-1" role="listbox" aria-labelledby="listbox-label" className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5" x-max="1">
						{options.map((option, i) => (
							<li key={i} id="listbox-option-0" onClick={() => selectOption(option)} className="cursor-default select-none relative py-2 pl-3 pr-9 text-gray-900 dark:text-gray-300 hover:text-white dark-hover:text-gray-200 hover:bg-indigo-600 dark-hover:bg-indigo300">
								<span role="option" className={`${option.value === value ? 'font-semibold' : 'font-normal'} block truncate`} aria-selected={option.value === value}>
									{option.name}
								</span>

								{option.value === value && (
									<span className="absolute inset-y-0 right-0 flex items-center pr-2 text-indigo-600 dark:text-indigo-500">
										<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
										</svg>
									</span>
								)}
							</li>
						))}
					</ul>
				</div>
			</Transition>
		</div>
	)
}

const SpotiftItem = ({ href, image, name }) => (
	<a href={href} target="_blank" rel="noopener noreferrer">
		{image ? <div className="bg-white p-4 rounded-lg w-24 h-24 bg-cover" style={{ backgroundImage: `url(${image})` }} /> : <Skeleton className="w-24 h-24" />}
		<p className="mt-1 text-center text-sm dark:text-gray-400">{name || <Skeleton />}</p>
	</a>
)

const ShareModal = ({ isOpen, onClose, url }) => {
	const { isDark } = useTheme()
	const [showQR, setShowQR] = useState(false)
	const [qrImage, setQrImage] = useState(null)

	useEffect(() => {
		QRCode.toDataURL(url, {
			errorCorrectionLevel: 'M',
			color: {
				dark: isDark ? '#e5e7eb' : '#374151',
				light: isDark ? '#161e2e' : '#f4f5f7',
			},
		}).then((url) => setQrImage(url))
	}, [url, isDark])

	const shareNative = () => {
		navigator.share({
			title: 'Harmony',
			text: 'Check what music we have in common!',
			url,
		})
	}

	const copyLink = () => {
		navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
			if (!['granted', 'prompt'].includes(result.state)) return

			navigator.clipboard.writeText(url).then(() => onClose())
		})
	}

	const openQR = () => {
		onClose()
		setShowQR(true)
	}

	return (
		<>
			<div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center z-30 pointer-events-none">
				<Transition show={isOpen} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
					<div className="fixed inset-0 transition-opacity">
						<div onClick={onClose} className="absolute inset-0 bg-gray-500 dark:bg-gray-600 opacity-75 pointer-events-auto" />
					</div>
				</Transition>

				<Transition show={isOpen} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
					<div className="bg-white dark:bg-gray-900 rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6 pointer-events-auto" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
						<div>
							<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-gray-800">
								<ShareOutline className="h-6 w-6 text-indigo-600 dark:text-gray-400" />
							</div>
							<div className="mt-3 text-center sm:mt-5">
								<h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-300" id="modal-headline">
									Share your profile
								</h3>
								<div className="mt-2">
									<p className="text-sm leading-5 text-gray-500 dark:text-gray-400">Share your Harmony profile with your friends to see what music you have in common.</p>
								</div>
							</div>
						</div>
						<div className="mt-5 sm:mt-6 flex items-center space-x-4">
							<span className="flex w-full rounded-md shadow-sm">
								<button onClick={navigator.share ? shareNative : copyLink} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 dark:bg-gray-800 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 dark-hover:bg-gray-700 focus:outline-none focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5">
									{navigator.share ? 'Share Link' : 'Copy Link'}
								</button>
							</span>
							<span className="flex w-full rounded-md shadow-sm">
								<button onClick={openQR} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 dark:bg-gray-800 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 dark-hover:bg-gray-700 focus:outline-none focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5">
									Show QR Code
								</button>
							</span>
						</div>
					</div>
				</Transition>
			</div>
			<Portal>
				<div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
					<Transition show={showQR} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
						<div className="fixed inset-0 transition-opacity">
							<div onClick={() => setShowQR(false)} className="absolute inset-0 bg-gray-500 dark:bg-gray-600 opacity-75 pointer-events-auto" />
						</div>
					</Transition>

					<Transition show={showQR} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
						<img src={qrImage} className="transform transition-all pointer-events-auto w-full h-auto max-w-xs" role="dialog" aria-modal="true" alt="QR Code" />
					</Transition>
				</div>
			</Portal>
		</>
	)
}

Profile.getLayout = usePageLayout()

export async function getServerSideProps({ params: { username }, req }) {
	const { accessToken } = cookies({ req })

	Client.setToken(accessToken)

	try {
		const profile = await Client.profile(username)

		return {
			props: {
				profile: {
					username: profile.id,
					name: profile.name,
					avatar: profile.avatar,
				},
			},
		}
	} catch (e) {
		if (e.response.status === 404) return { props: { error: { statusCode: 404 } } }

		return { props: { error: { statusCode: 500 } } }
	}
}

export default Profile
