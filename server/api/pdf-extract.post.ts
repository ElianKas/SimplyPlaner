import { PDFParse } from 'pdf-parse';
import { readFile } from 'fs/promises';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const buffer = await readFile('reports/pdf/simple-table.pdf');
	const parser = new PDFParse({ data: buffer });

	parser
		.getTable()
		.then((result) => {
			console.log(result);

			// Pretty-print each row of the first table
			for (const row of result.pages[0].tables[0]) {
				console.log(JSON.stringify(row));
			}
		})
		.catch((err) => console.log(err));

	await parser.destroy();

	return { body };
});
