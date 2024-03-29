import { GoogleSpreadsheet } from 'google-spreadsheet';

const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const { privateKey: PRIVATE_KEY } = JSON.parse(
	process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY,
);

export default async (req, res) => {
	const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
	const {
		query: { sheetId },
	} = req;

	try {
		await doc.useServiceAccountAuth({
			client_email: CLIENT_EMAIL,
			private_key: PRIVATE_KEY,
		});
		// loads document properties and worksheets
		await doc.loadInfo();
		const sheet = doc.sheetsById[sheetId];
		const rows = await sheet.getRows();

		const data = rows
			.slice(0, 14)
			.filter((row) => row.Address && row.Address.length > 0)
			.map((row) => ({
				id: row._rowNumber,
				name: row.Name || '[no name]',
				phone: row.Phone,
				address: row.Address,
				plusCode: row.PlusCode.includes('9F42')
					? row.PlusCode
					: `9F42${row.PlusCode}`,
				allergies: row['Allergies?'],
				deliveries: {
					Tuesday: row.Tue,
					Thursday: row.Thur,
					Sunday: row.Sun,
				},
				notes: row.Notes,
				optimalRoute: parseInt(row['optimal route']),
				whenNotHome: row['When not home'],
			}));

		res.status(200).json({ rows: data });
	} catch (e) {
		res.status(400).json({ error: `Something went wrong - ${e}` });
		// eslint-disable-next-line no-console
		console.error('Error: ', e);
	}
};
