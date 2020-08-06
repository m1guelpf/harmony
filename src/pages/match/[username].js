import { usePageLayout } from '../../components/PageLayout'
import Avatar from '../../components/Avatar'
import useSWR from 'swr'
import { useState } from 'react'
import Transition from '../../components/Transition'
import Skeleton from '../../components/Skeleton'
import useUser from '../../hooks/session'
import { WithAuth } from '../../middleware/auth'
import collect from 'collect.js'
import cookies from 'next-cookies'
import Client from '../../utils/client'

const spotifyPeriods = [
	{ name: 'All Time', value: 'long_term' },
	{ name: 'Last 6 Months', value: 'medium_term' },
	{ name: 'Last Month', value: 'short_term' },
]

const Match = ({ profile: profile }) => {
	const user = useUser()
	const [artistPeriod, setArtistPeriod] = useState(spotifyPeriods[0].value)
	const [songPeriod, setSongPeriod] = useState(spotifyPeriods[0].value)

	const { data: userArtists } = useSWR(
		() => `stats-artists-${user.id}-${artistPeriod}`,
		() => Client.stats({ type: 'artists', period: artistPeriod, username: user.id })
	)
	const { data: userSongs } = useSWR(
		() => `stats-tracks-${user.id}-${artistPeriod}`,
		() => Client.stats({ type: 'tracks', period: artistPeriod, username: user.id })
	)

	const { data: profileArtists } = useSWR(`stats-artists-${profile.username}-${artistPeriod}`, () => Client.stats({ type: 'artists', period: artistPeriod, username: profile.username }))

	const { data: profileSongs } = useSWR(`stats-tracks-${profile.username}-${artistPeriod}`, () => Client.stats({ type: 'tracks', period: artistPeriod, username: profile.username }))

	const songs = calculateSongs(userSongs, profileSongs)
	const artists = calculateArtists(userArtists, profileArtists, songs)

	return (
		<div>
			<div className="flex items-center">
				<div className="flex relative z-0">
					<Avatar className="w-12 h-12" parentClasses="z-30 text-white shadow-solid" src={profile.avatar} />
					<Avatar className="w-12 h-12" parentClasses="-ml-8 z-20 text-white shadow-solid" src={user?.avatar} />
				</div>
				<div className="ml-3">
					<h1 className="text-2xl font-medium text-gray-800">
						{user?.name || <Skeleton width={100} />} &amp; {profile.name}
					</h1>
					<p className="text-gray-600">Here's what you two have in common</p>
				</div>
			</div>
			<div className="mt-8">
				<div>
					<div className="flex items-center justify-between mb-2">
						<p className="text-xl font-medium">Artists</p>
						<Dropdown className="flex-1" options={spotifyPeriods} value={artistPeriod} onChange={setArtistPeriod} />
					</div>
					<div className="flex items-stretch overflow-x-auto space-x-4">{artists ? artists.map(({ id, images, name, external_urls: { spotify: href } }) => <SpotiftItem key={id} href={href} image={images[0].url} name={name} />) : [...Array(10).keys()].map((id) => <SpotiftItem key={id} />)}</div>
				</div>
				<div className="mt-4">
					<div className="flex items-center justify-between mb-2">
						<p className="text-xl font-medium">Songs</p>
						<Dropdown className="flex-1" options={spotifyPeriods} value={songPeriod} onChange={setSongPeriod} />
					</div>
					<div className="flex items-stretch overflow-x-auto space-x-4">{songs ? songs.map(({ id, album: { images }, name, external_urls: { spotify: href } }) => <SpotiftItem key={id} href={href} image={images[0].url} name={name} />) : [...Array(10).keys()].map((id) => <SpotiftItem key={id} />)}</div>
				</div>
			</div>
		</div>
	)
}

const calculateSongs = (userSongs, profileSongs) => {
	profileSongs = collect(profileSongs)

	return collect(userSongs).filter((song) => profileSongs.contains('id', song.id))
}

const calculateArtists = (userArtists, profileArtists, songs) => {
	profileArtists = collect(profileArtists)

	const songArtists = songs.map((song) => song.artists).flatten(1)

	return collect(userArtists)
		.filter((artist) => profileArtists.contains('id', artist.id))
		.merge(songArtists)
		.unique('id')
}

const Dropdown = ({ options, className = '', value, onChange, ...props }) => {
	const [isOpen, setOpen] = useState(false)

	const selectOption = (option) => {
		setOpen(false)

		onChange(option.value)
	}

	return (
		<div className={`relative flex items-center justify-end ${className}`}>
			<button onClick={() => setOpen((state) => !state)} type="button" aria-haspopup="listbox" aria-expanded={isOpen ? 'open' : 'closed'} aria-labelledby="listbox-label" className="cursor-pointer flex items-center pl-1.5 rounded focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
				<span className="text-lg font-medium text-gray-600">{options.filter((option) => option.value === value)[0].name}</span>
				<span className="pointer-events-none">
					<svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="none" stroke="currentColor">
						<path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</span>
			</button>
			<Transition show={isOpen} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
				<div className="absolute top-6 right-0 origin-top-right mt-1 w-full rounded-md bg-white shadow-lg z-30">
					<ul tabIndex="-1" role="listbox" aria-labelledby="listbox-label" className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5" x-max="1">
						{options.map((option, i) => (
							<li key={i} id="listbox-option-0" role="option" onClick={() => selectOption(option)} className="cursor-default select-none relative py-2 pl-3 pr-9 text-gray-900 hover:text-white hover:bg-indigo-600">
								<span className={`${option.value === value ? 'font-semibold' : 'font-normal'} block truncate`}>{option.name}</span>

								{option.value === value && (
									<span className="absolute inset-y-0 right-0 flex items-center pr-2 text-indigo-600">
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
		<p className="mt-1 text-center text-sm">{name || <Skeleton />}</p>
	</a>
)

Match.getLayout = usePageLayout()
Match.middleware = [WithAuth]

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
		if (e.message === 'User does not exist') return { props: { error: { statusCode: 404 } } }

		return { props: { error: { statusCode: 500 } } }
	}
}

export default Match
