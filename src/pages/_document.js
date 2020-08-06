import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html>
				<Head>
					<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
					<meta name="application-name" content="Harmony" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-status-bar-style" content="default" />
					<meta name="apple-mobile-web-app-title" content="Harmony" />
					<meta name="description" content="Find out what music you share with others!" />
					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="msapplication-config" content="/img/browserconfig.xml" />
					<meta name="msapplication-TileColor" content="#2B5797" />
					<meta name="msapplication-tap-highlight" content="no" />
					<meta name="theme-color" content="#6754cb" />
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:url" content="https://harmony.report" />
					<meta name="twitter:title" content="Harmony" />
					<meta name="twitter:description" content="Find out what music you share with others!" />
					<meta name="twitter:creator" content="@m1guelpf" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content="Harmony" />
					<meta property="og:description" content="Find out what music you share with others!" />
					<meta property="og:site_name" content="Harmony" />
					<meta property="og:url" content="https://harmony.report" />
					<link rel="apple-touch-icon" sizes="57x57" href="/img/apple-icon-57x57.png" />
					<link rel="apple-touch-icon" sizes="60x60" href="/img/apple-icon-60x60.png" />
					<link rel="apple-touch-icon" sizes="72x72" href="/img/apple-icon-72x72.png" />
					<link rel="apple-touch-icon" sizes="76x76" href="/img/apple-icon-76x76.png" />
					<link rel="apple-touch-icon" sizes="114x114" href="/img/apple-icon-114x114.png" />
					<link rel="apple-touch-icon" sizes="120x120" href="/img/apple-icon-120x120.png" />
					<link rel="apple-touch-icon" sizes="144x144" href="/img/apple-icon-144x144.png" />
					<link rel="apple-touch-icon" sizes="152x152" href="/img/apple-icon-152x152.png" />
					<link rel="apple-touch-icon" sizes="180x180" href="/img/apple-icon-180x180.png" />
					<link rel="icon" type="image/png" sizes="192x192" href="/img/android-icon-192x192.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="96x96" href="/img/favicon-96x96.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
					<link rel="manifest" href="/manifest.json" />
					<meta name="msapplication-TileImage" content="/img/ms-icon-144x144.png" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
