import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
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
};

const Region = {
	East: 'East',
	Central: 'Central',
	North: 'North',
	South: 'South',
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
		case 2:
			return Day.Tuesday;
		case 3:
		case 4:
			return Day.Thursday;
		case 5:
		case 6:
		case 7:
			return Day.Sunday;
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
	const nextDay = getNextDay();

	useEffect(() => {
		setIsLoading(true);
		getSheetData(RegionSheetCode[region]).then((sheetData) => {
			const cleanData = sheetData?.data?.rows
				.filter((row) => row.deliveries[nextDay] > 0)
				.sort((a, b) => a.optimalRoute > b.optimalRoute);
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
			<Menu>
				<MenuButton as={Button} rightIcon={<ChevronDownIcon />} ml={2}>
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
