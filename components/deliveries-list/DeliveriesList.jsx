import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Item from './item';
import LoadingSpinner from '../loading-spinner';
import styles from './DeliveriesList.module.scss';

const Region = {
	East: '1505264217',
	Central: '2130690733',
	North: '2147400358',
	South: '738737227',
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

	useEffect(() => {
		getSheetData(Region.East).then((sheetData) => {
			setData(sheetData?.data?.rows);
		});
	}, []);

	if (!data) return <LoadingSpinner />;

	return (
		<div className={styles.root}>
			<ul className={styles.list}>
				{data.map((item) => {
					return <Item data={item} key={item.id} />;
				})}
			</ul>
		</div>
	);
};

export default DeliveriesList;
