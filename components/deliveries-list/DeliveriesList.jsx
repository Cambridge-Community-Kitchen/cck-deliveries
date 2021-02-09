import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Item from './item';
import LoadingSpinner from '../loading-spinner';
import BackToLockon from '../../components/back-to-lockon';
import styles from './DeliveriesList.module.scss';
import { RegionSheetCodes } from '../../config/constants';

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

const DeliveriesList = ({ onReset, region }) => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const { day: nextDay, date } = getNextDay();

	useEffect(() => {
		setIsLoading(true);
		getSheetData(RegionSheetCodes[region]).then((sheetData) => {
			const cleanData = sheetData?.data?.rows.filter(
				(row) => row.deliveries[nextDay] > 0,
			);
			setData(cleanData);
			setIsLoading(false);
		});
	}, [nextDay, region]);

	const updateItemCompletion = useCallback(
		(id, value) => {
			const updatedItemIndex = data.findIndex((item) => item.id === id);
			if (updatedItemIndex !== -1) {
				setData([
					...data.slice(0, updatedItemIndex),
					Object.assign({}, data[updatedItemIndex], {
						completed: value,
					}),
					...data.slice(updatedItemIndex + 1),
				]);
			}
		},
		[data],
	);

	const markItemComplete = useCallback(
		(id) => updateItemCompletion(id, true),
		[updateItemCompletion],
	);

	const unmarkItemComplete = useCallback(
		(id) => updateItemCompletion(id, false),
		[updateItemCompletion],
	);

	if (!data || isLoading) return <LoadingSpinner />;

	console.log(data);

	return (
		<div className={styles.root}>
			<Box d="flex" justifyContent="space-between">
				<Box d="flex" ml={2} mr={2}>
					<Text>Deliveries for </Text>
					<Text fontWeight={700} ml={1}>
						{date.format('DD/MM/YYYY')}
					</Text>
					<Text>&nbsp;in </Text>
					<Text fontWeight={700} ml={1}>
						{region}
					</Text>
				</Box>
				<Button
					colorScheme="grey"
					mr={2}
					onClick={onReset}
					size="sm"
					variant="outline"
				>
					Reset
				</Button>
			</Box>
			<ul className={styles.list}>
				{data.map((item) => {
					const portions = item.deliveries[nextDay];
					return (
						<Item
							data={item}
							key={item.id}
							markComplete={() => markItemComplete(item.id)}
							portions={portions}
							unmarkComplete={() => unmarkItemComplete(item.id)}
						/>
					);
				})}
			</ul>
			<BackToLockon />
		</div>
	);
};

DeliveriesList.propTypes = {
	onReset: PropTypes.func.isRequired,
	region: PropTypes.string.isRequired,
};

export default DeliveriesList;
