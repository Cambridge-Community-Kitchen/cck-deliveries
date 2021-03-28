import { GoogleSpreadsheet } from 'google-spreadsheet';
import { SheetCodes } from '../../config/constants';

const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const { privateKey: PRIVATE_KEY } = JSON.parse(
	process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY,
);

const PW_CELL = 'F2';

export default async (req, res) => {
	const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

	try {
		await doc.useServiceAccountAuth({
			client_email: CLIENT_EMAIL,
			private_key: PRIVATE_KEY,
		});
		// loads document properties and worksheets
		await doc.loadInfo();
		const sheet = doc.sheetsById[SheetCodes.DishOfTheDay];
		await sheet.loadCells(PW_CELL);
		const expectedPasscode = sheet.getCellByA1(PW_CELL).value;

		const rows = await sheet.getRows();

		const data = rows.slice(-1).map((row) => ({
			timestamp: row['Timestamp'],
			dish: row['Dish name'],
			ingredients: row['What are the ingredients?'],
			allergens: row['Any allergens?'],
			passcode: row['Passcode'],
			expectedPasscode,
		}));

		res.status(200).json({ rows: data });
	} catch (e) {
		res.status(404).json({ error: 'Something went wrong' });
		// eslint-disable-next-line no-console
		console.error('Error: ', e);
	}
};
