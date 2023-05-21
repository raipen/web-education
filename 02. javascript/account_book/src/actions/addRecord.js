const { readRecords, writeRecords } = require('../utils/IO');
const { createByInput } = require('../utils/Record');

module.exports = async () => {
    const [record,records] = await Promise.all([createByInput(), readRecords()]);
    record.print();
    await writeRecords([...records, record]);
}