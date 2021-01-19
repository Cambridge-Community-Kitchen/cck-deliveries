import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
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

	useEffect(() => {
		setIsLoading(true);
		getSheetData(RegionSheetCode[region]).then((sheetData) => {
			setData(sheetData?.data?.rows);
			setIsLoading(false);
		});
	}, [region]);

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
					return <Item data={item} key={item.id} />;
				})}
			</ul>
		</div>
	);
};

export default DeliveriesList;
