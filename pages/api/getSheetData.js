import { GoogleSpreadsheet } from 'google-spreadsheet';

const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

export default (req, res) => {
	console.log('endpoint hit');
	const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

	const appendSpreadsheet = async (row) => {
		try {
			await doc.useServiceAccountAuth({
				client_email: CLIENT_EMAIL,
				private_key: PRIVATE_KEY,
			});
			// loads document properties and worksheets
			await doc.loadInfo();
			console.log('info loaded');
			const sheet = doc.sheetsById[SHEET_ID];
			const result = await sheet.addRow(row);
			console.log(result);
		} catch (e) {
			console.error('Error: ', e);
		}
	};

	const newRow = { Name: 'new name', Value: 'new value' };
	appendSpreadsheet(newRow);
	res.statusCode = 200;
	res.json({ name: 'John Doe' });
};
