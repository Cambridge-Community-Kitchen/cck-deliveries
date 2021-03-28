import Head from 'next/head';
import PropTypes from 'prop-types';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => (
	<>
		<Head>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes, viewport-fit=cover"
			/>
		</Head>
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</ChakraProvider>
	</>
);

App.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.any,
};

export default App;
