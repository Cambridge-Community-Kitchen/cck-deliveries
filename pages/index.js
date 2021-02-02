import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useDisclosure } from '@chakra-ui/react';
import useLocalStorage from '../hooks/useLocalStorage.jsx';
import DeliveriesList from '../components/deliveries-list';
import Header from '../components/header';
import Authorization from '../components/authorization';
import styles from '../styles/Home.module.css';

const Region = {
	East: 'East',
	Central: 'Central',
	North1: 'North 1',
	North2: 'North 2',
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
	const [isLoading, setIsLoading] = useState(false);
	const [passwords, setPasswords] = useState();
	const [currentPassword, setCurrentPassword] = useLocalStorage('pw');
	const [region, setRegion] = useState(Region.East);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const verifyPassword = useCallback(
		(value) => {
			let isPasswordCorrect = false;
			Object.keys(passwords).map((key) => {
				if (key.toLowerCase() === value.toLowerCase()) {
					setIsAuthorized(true);
					setRegion(passwords[key]);
					onClose();
					isPasswordCorrect = true;
				}
			});

			if (!isPasswordCorrect) {
				setCurrentPassword('');
			}
		},
		[onClose, passwords, setCurrentPassword],
	);

	useEffect(() => {
		if (!isAuthorized) {
			onOpen();
		}
		if (!passwords) {
			setIsLoading(true);
			getAuthInfo().then((response) => {
				setPasswords(response?.data?.pwds);
				setIsLoading(false);
			});
		}
	}, [currentPassword, isAuthorized, onOpen, passwords, verifyPassword]);

	useEffect(() => {
		if (currentPassword?.length === 4 && passwords) {
			verifyPassword(currentPassword);
		}
	}, [currentPassword, passwords, verifyPassword]);

	const onPasswordChange = useCallback(
		(value) => {
			setCurrentPassword(value);
		},
		[setCurrentPassword],
	);

	const onPasswordComplete = useCallback(
		(value) => {
			verifyPassword(value);
		},
		[verifyPassword],
	);

	const onReset = useCallback(() => {
		setCurrentPassword('');
		setIsAuthorized(false);
	}, [setCurrentPassword]);

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
						isLoading={isLoading}
						isOpen={isOpen}
						onChange={onPasswordChange}
						onClose={onClose}
						onComplete={onPasswordComplete}
						value={currentPassword}
					/>
				)}
				{isAuthorized && (
					<DeliveriesList onReset={onReset} region={region} />
				)}
			</main>
		</>
	);
}
