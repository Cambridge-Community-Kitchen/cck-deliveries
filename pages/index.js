import axios from 'axios';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
	const makeSheetChange = async () => {
		console.log('making sheet change');

		try {
			await axios.post('/api/getSheetData');
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<button onClick={() => makeSheetChange()}>Do stuff</button>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<img
						src="/vercel.svg"
						alt="Vercel Logo"
						className={styles.logo}
					/>
				</a>
			</footer>
		</div>
	);
}
