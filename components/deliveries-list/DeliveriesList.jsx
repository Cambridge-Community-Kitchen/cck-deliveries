import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
	Box,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import Item from './item';
import LoadingSpinner from '../loading-spinner';
import styles from './DeliveriesList.module.scss';

const RegionSheetCode = {
	East: '1505264217',
	Central: '2130690733',
	North: '2147400358',
	South: '738737227',
	Trumpington: '271355350',
};

const Region = {
	East: 'East',
	Central: 'Central',
	North: 'North',
	South: 'South',
	Trumpington: 'Trumpington',
};

const Day = {
	Tuesday: 'Tuesday',
	Thursday: 'Thursday',
	Sunday: 'Sunday',
};

const getNextDay = () => {
	const today = dayjs().day();
	switch (today) {
		case 1:
			return { day: Day.Tuesday, date: dayjs().add(1, 'day') };
		case 2:
			return { day: Day.Tuesday, date: dayjs() };
		case 3:
			return { day: Day.Thursday, date: dayjs().add(1, 'day') };
		case 4:
			return { day: Day.Thursday, date: dayjs() };
		case 5:
			return { day: Day.Sunday, date: dayjs().add(2, 'day') };
		case 6:
			return { day: Day.Sunday, date: dayjs().add(1, 'day') };
		case 0:
			return { day: Day.Sunday, date: dayjs() };
	}
};

const getSheetData = async (sheetId) => {
	try {
		return await axios.get(`/api/getSheetData/${sheetId}`);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e);
	}
};

const DeliveriesList = () => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [region, setRegion] = useState(Region.East);
	const { day: nextDay, date } = getNextDay();

	useEffect(() => {
		setIsLoading(true);
		getSheetData(RegionSheetCode[region]).then((sheetData) => {
			const cleanData = sheetData?.data?.rows.filter(
				(row) => row.deliveries[nextDay] > 0,
			);
			setData(cleanData);
			setIsLoading(false);
		});
	}, [nextDay, region]);

	const handleRegionChange = useCallback((event) => {
		setRegion(event.target.value);
	}, []);

	if (!data || isLoading) return <LoadingSpinner />;

	return (
		<div className={styles.root}>
			<Box d="flex" alignItems="baseline" justifyContent="space-between">
				<Menu>
					<MenuButton
						as={Button}
						rightIcon={<ChevronDownIcon />}
						ml={2}
					>
						{region}
					</MenuButton>
					<MenuList>
						{Object.keys(Region).map((key) => (
							<MenuItem
								key={key}
								onClick={handleRegionChange}
								value={key}
							>
								{key}
							</MenuItem>
						))}
					</MenuList>
				</Menu>
				<Box d="flex" mr={2}>
					<Text>Deliveries for </Text>
					<Text fontWeight={700} ml={1}>
						{date.format('DD/MM/YYYY')}
					</Text>
				</Box>
			</Box>
			<ul className={styles.list}>
				{data.map((item) => {
					const portions = item.deliveries[nextDay];
					return (
						<Item data={item} portions={portions} key={item.id} />
					);
				})}
			</ul>
		</div>
	);
};

export default DeliveriesList;
