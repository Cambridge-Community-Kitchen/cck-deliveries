import Head from 'next/head';
import PropTypes from 'prop-types';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => (
	<>
		<Head>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
			/>
			<link
				rel="apple-touch-icon"
				href="public/icons/apple-icon-180.png"
			/>

			<meta name="apple-mobile-web-app-capable" content="yes" />

			<meta name="application-name" content="CCK Deliveries" />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta
				name="apple-mobile-web-app-status-bar-style"
				content="default"
			/>
			<meta name="apple-mobile-web-app-title" content="CCK Deliveries" />
			<meta
				name="description"
				content="CCK - App for delivery volunteers"
			/>
			<meta name="format-detection" content="telephone=no" />
			<meta name="mobile-web-app-capable" content="yes" />
			<meta
				name="msapplication-config"
				content="/static/icons/browserconfig.xml"
			/>
			<meta name="msapplication-TileColor" content="#FA9320" />
			<meta name="msapplication-tap-highlight" content="no" />
			<meta name="theme-color" content="#FA9320" />

			<meta property="og:type" content="website" />
			<meta property="og:title" content="CCK Deliveries" />
			<meta
				property="og:description"
				content="CCK - App for delivery volunteers"
			/>
			<meta property="og:site_name" content="CCK Deliveries" />
			{/* <meta
				property="og:image"
				content="https://yourdomain.com/static/icons/apple-touch-icon.png"
			/> */}

			<link
				rel="apple-touch-icon"
				sizes="57x57"
				href="icons/apple-icon-57x57.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="60x60"
				href="icons/apple-icon-60x60.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="72x72"
				href="icons/apple-icon-72x72.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="76x76"
				href="icons/apple-icon-76x76.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="114x114"
				href="icons/apple-icon-114x114.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="120x120"
				href="icons/apple-icon-120x120.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="144x144"
				href="icons/apple-icon-144x144.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="152x152"
				href="icons/apple-icon-152x152.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="icons/apple-icon-180x180.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="192x192"
				href="icons/android-icon-192x192.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="icons/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="96x96"
				href="icons/favicon-96x96.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="icons/favicon-16x16.png"
			/>
		</Head>
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	</>
);

App.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.any,
};

export default App;
