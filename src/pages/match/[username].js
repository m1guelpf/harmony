import { usePageLayout } from '../../components/PageLayout'
import Avatar from '../../components/Avatar'
import useSWR from 'swr'
import { useState } from 'react'
import Skeleton from '../../components/Skeleton'
import useUser from '../../hooks/session'
import { WithAuth } from '../../middleware/auth'
import Client from '../../utils/client'
import { SpotifySection, getServerSideProps as getServerProps } from '../[username]'

const spotifyPeriods = [
	{ name: 'All Time', value: 'long_term' },
	{ name: 'Last 6 Months', value: 'medium_term' },
	{ name: 'Last Month', value: 'short_term' },
]

const Match = ({ profile: profile }) => {
	const user = useUser()
	const [artistPeriod, setArtistPeriod] = useState(spotifyPeriods[0].value)
	const [songPeriod, setSongPeriod] = useState(spotifyPeriods[0].value)

	const { data: artists } = useSWR(
		() => `stats-artists-${user.id}-${profile.username}-${artistPeriod}`,
		() => Client.match({ type: 'artists', period: artistPeriod, username: profile.username })
	)

	const { data: songs } = useSWR(
		() => `stats-tracks-${user.id}-${profile.username}-${artistPeriod}`,
		() => Client.match({ type: 'tracks', period: songPeriod, username: profile.username })
	)

	return (
		<div>
			<div className="flex items-center">
				<div className="flex relative z-0">
					<Avatar className="w-12 h-12" parentClasses="z-30 text-white dark:text-gray-700 shadow-solid" src={profile.avatar} />
					<Avatar className="w-12 h-12" parentClasses="-ml-8 z-20 text-white dark:text-gray-700 shadow-solid" src={user?.avatar} />
				</div>
				<div className="ml-3">
					<h1 className="text-2xl font-medium text-gray-800 dark:text-gray-300">
						{user?.name || <Skeleton width={100} />} &amp; {profile.name}
					</h1>
					<p className="text-gray-600 dark:text-gray-400">Here's what you two have in common</p>
				</div>
			</div>
			<div className="mt-8">
				<SpotifySection title="Favourite Artists" period={artistPeriod} setPeriod={setArtistPeriod} items={artists} itemParse={({ id, images, name, external_urls: { spotify: href } }) => ({ id, image: images?.[0]?.url, name, href })} emptyMessage="You don't seem to have any artists in common for this period" />
				<SpotifySection className="mt-4" title="Favourite Songs" period={songPeriod} setPeriod={setSongPeriod} items={songs} itemParse={({ id, album: { images }, name, external_urls: { spotify: href } }) => ({ id, image: images[0].url, name, href })} emptyMessage="You don't seem to have any songs in common for this period" />
			</div>
		</div>
	)
}

Match.getLayout = usePageLayout()
Match.middleware = [WithAuth]

export const getServerSideProps = getServerProps

export default Match
