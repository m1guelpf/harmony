import { usePageLayout } from '../components/PageLayout'
import Avatar from '../components/Avatar'
import axios from 'axios'
import useSWR from 'swr'
import { useState } from 'react'
import Transition from '../components/Transition'
import Skeleton from '../components/Skeleton'
import useUser from '../hooks/session'
import Link from 'next/link'
import Client from '../utils/client'
import cookies from 'next-cookies'

const spotifyPeriods = [
	{ name: 'All Time', value: 'long_term' },
	{ name: 'Last 6 Months', value: 'medium_term' },
	{ name: 'Last Month', value: 'short_term' },
]

const Profile = ({ profile }) => {
	const user = useUser()
	const [artistPeriod, setArtistPeriod] = useState(spotifyPeriods[0].value)
	const [songPeriod, setSongPeriod] = useState(spotifyPeriods[0].value)
	const { data: artists } = useSWR(
		() => `stats-artists-${profile.username}-${artistPeriod}`,
		() => Client.stats({ type: 'artists', period: artistPeriod, username: profile.username })
	)
	const { data: songs } = useSWR(
		() => `stats-tracks-${profile.username}-${artistPeriod}`,
		() => Client.stats({ type: 'tracks', period: songPeriod, username: profile.username })
	)

	return (
		<div>
			<div className="flex items-center">
				<Avatar className="w-12 h-12" src={profile.avatar} />
				<div className="ml-3">
					<h1 className="text-2xl font-medium text-gray-800">{profile.name}</h1>
					<p className="text-gray-600">Filler text here</p>
				</div>
			</div>
			{!user && (
				<span className="mt-4 w-full inline-flex rounded-md shadow-sm">
					<Link href="/login">
						<a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out" aria-label="Sign in with Facebook">
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
						<a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out">
							<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 168 168">
								<path fillRule="evenodd" clipRule="evenodd" d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z" />
							</svg>
							<span className="ml-2">Check the music you have in common</span>
						</a>
					</Link>
				</span>
			)}
			<div className="mt-8">
				<div>
					<div className="flex items-center justify-between mb-2">
						<p className="text-xl font-medium">Favourite Artists</p>
						<Dropdown className="flex-1" options={spotifyPeriods} value={artistPeriod} onChange={setArtistPeriod} />
					</div>
					<div className="flex items-stretch overflow-x-auto space-x-4">{artists ? artists.map(({ id, images, name, external_urls: { spotify: href } }) => <SpotiftItem key={id} href={href} image={images[0].url} name={name} />) : [...Array(10).keys()].map((id) => <SpotiftItem key={id} />)}</div>
				</div>
				<div>
					<div className="flex items-center justify-between mb-2">
						<p className="text-xl font-medium">Favourite Songs</p>
						<Dropdown className="flex-1" options={spotifyPeriods} value={songPeriod} onChange={setSongPeriod} />
					</div>
					<div className="flex items-stretch overflow-x-auto space-x-4">{songs ? songs.map(({ id, album: { images }, name, external_urls: { spotify: href } }) => <SpotiftItem key={id} href={href} image={images[0].url} name={name} />) : [...Array(10).keys()].map((id) => <SpotiftItem key={id} />)}</div>
				</div>
			</div>
		</div>
	)
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
				<div className="absolute top-6 right-0 origin-top-right mt-1 w-full rounded-md bg-white shadow-lg">
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
		if (e.message === 'User does not exist') return { props: { error: { statusCode: 404 } } }

		console.log(e)

		return { props: { error: { statusCode: 500 } } }
	}
}

export default Profile