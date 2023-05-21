const { readFromStdIn } = require('./IO');

module.exports = class Record {
    constructor(defaltRecord) {
        this.record = defaltRecord;
    }

    static defaltRecord() {
        return {
            date: new Date(),
            category: '미분류',
            description: '미입력상품',
            price: -1
        }
    }

}