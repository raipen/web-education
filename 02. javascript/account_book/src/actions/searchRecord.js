import { readRecords } from '../utils/IO.js';
import Record from '../utils/Record.js';

export default async () => {
    const records = await readRecords();
    Record.printTitle();
    records.forEach((record) => {
        record.print();
    });
}