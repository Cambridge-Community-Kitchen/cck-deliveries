import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useDisclosure } from '@chakra-ui/react';
import DeliveriesList from '../components/deliveries-list';
import Header from '../components/header';
import Authorization from '../components/authorization';
import styles from '../styles/Home.module.css';

const Region = {
	East: 'East',
	Central: 'Central',
	North: 'North',
	South: 'South',
	Trumpington: 'Trumpington',
};

const getAuthInfo = async () => {
	try {
		return await axios.get(`/api/verifyAuthorization`);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e);
	}
};

export default function Home() {
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [passwords, setPasswords] = useState();
	const [region, setRegion] = useState(Region.East);
	const [currentPassword, setCurrentPassword] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();

	console.log(passwords);

	useEffect(() => {
		if (!isAuthorized) {
			onOpen();
		}
		getAuthInfo().then((response) => {
			setPasswords(response.data.pwds);
		});
	}, [isAuthorized, onOpen]);

	const onPasswordComplete = useCallback(
		(value) => {
			Object.keys(passwords).map((key) => {
				if (key.toLowerCase() === value.toLowerCase()) {
					setIsAuthorized(true);
					setRegion(passwords[key]);
					onClose();
				}
			});
		},
		[onClose, passwords],
	);

	return (
		<>
			<Head>
				<title>CCK - Deliveries</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Header />
				{!isAuthorized && (
					<Authorization
						isOpen={isOpen}
						onClose={onClose}
						onComplete={onPasswordComplete}
						value={currentPassword}
					/>
				)}
				{isAuthorized && <DeliveriesList region={region} />}
			</main>
		</>
	);
}
