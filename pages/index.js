import { useQuery } from 'react-query';
import { useCallback, useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import Head from 'next/head';
import { useDisclosure } from '@chakra-ui/react';
import useLocalStorage from '../hooks/useLocalStorage.jsx';
import DeliveriesList from '../components/deliveries-list';
import Header from '../components/header';
import Authorization from '../components/authorization';
import styles from '../styles/Home.module.css';

const Region = {
    Arbury: 'Arbury',
    Barnwell: 'Barnwell',
    CambridgeNorth: 'Cambridge North',
    CherryHinton: 'Cherry Hinton',
    Chesterton: 'Chesterton',
    HillsRoad: 'Hills Road',
    KingsHedges: 'Kings Hedges',
    MillRoad: 'Mill Road',
    QueenEdith: 'Queen Edith',
    Trumpington: 'Trumpington',
    Demo: 'Demo',
};

const getAuthInfo = async () => {
	try {
		const response = await fetch(`/api/verifyAuthorization`);
		const res = await response.json();
		if (res?.error) {
			// TODO: show some kind of error to user
			console.error(res?.error);
		} else {
			return res?.pwds;
		}
	} catch (e) {
		console.error(e);
	}
};

export default function Home() {
	const { query } = useRouter();
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [currentPassword, setCurrentPassword] = useLocalStorage('pw');
	const [region, setRegion] = useState(Region.East);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isLoading, data: passwords } = useQuery(
		'getPasswords',
		getAuthInfo,
		{
			refetchOnMount: false,
			refetchOnWindowFocus: true,
			keepPreviousData: true,
		},
	);

	const verifyPassword = useCallback(
		(value) => {
			if (!passwords) return;

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[passwords],
	);

	useEffect(() => {
		if (!isAuthorized) {
			onOpen();
		}
	}, [currentPassword, isAuthorized, onOpen]);

	useEffect(() => {
		if (currentPassword?.length === 4 && passwords) {
			verifyPassword(currentPassword);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [passwords, verifyPassword]);

	useEffect(() => {
		if (query.p && passwords) {
			verifyPassword(query.p);
		}
	}, [passwords, query.p, verifyPassword]);

	const onPasswordChange = useCallback((value) => setCurrentPassword(value), [
		setCurrentPassword,
	]);

	const onPasswordComplete = useCallback((value) => verifyPassword(value), [
		verifyPassword,
	]);

	const onReset = useCallback(() => {
		setCurrentPassword('');
		setIsAuthorized(false);
		router.replace('/');
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
