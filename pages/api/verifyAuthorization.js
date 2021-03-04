import { GoogleSpreadsheet } from 'google-spreadsheet';
import { RegionSheetCodes } from '../../config/constants';

const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const { privateKey: PRIVATE_KEY } = JSON.parse(
	process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY,
);

const PW_CELL = 'L18';

export default async (req, res) => {
	const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

	try {
		await doc.useServiceAccountAuth({
			client_email: CLIENT_EMAIL,
			private_key: PRIVATE_KEY,
		});

		await doc.loadInfo();
		const pwds = {};
		for (const key in RegionSheetCodes) {
			const sheet = doc.sheetsById[RegionSheetCodes[key]];
			await sheet.loadCells(PW_CELL);
			const pw = sheet.getCellByA1(PW_CELL);
			pwds[pw.value] = key;
		}

		res.status(200).json({ pwds });
	} catch (e) {
		res.status(404).json({ error: 'Something went wrong' });
		// eslint-disable-next-line no-console
		console.error('Error: ', e);
	}
};
