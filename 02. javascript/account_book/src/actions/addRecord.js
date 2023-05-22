import { readRecords, writeRecords } from '../utils/IO.js';
import Record from '../utils/Record.js';

export default async () => {
    const [record,records] = await Promise.all([Record.createByInput(), readRecords()]);
    Record.printTitle();
    record.print();
    await writeRecords([...records, record]);
}