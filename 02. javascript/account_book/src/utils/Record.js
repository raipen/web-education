const { inputWithQuestion } = require('./IO');
const { date2String } = require('./etc');

module.exports = class Record {
    //#contetns: [{ key: String, question: String, requestion: String, defalt: Function, validate: Function, beforeValidate: Function || undefined, maxString: Number(0 for INF) }]
    static #contents = [
        {
            key: "date",
            question: "날짜를 입력하세요(YYYY-MM-DD): ",
            requestion: "잘못된 날짜 형식입니다. 다시 입력해주세요(YYYY-MM-DD): ",
            defalt: ()=>date2String(new Date()),
            validate: (date) => {
                if(typeof date !== 'string')
                    throw new Error('date is not string');
                if(date.match(/^\d{4}-\d{2}-\d{2}$/) === null)
                    return false;
                const [year, month, day] = date.split('-').map((num) => parseInt(num));
                if(year < 0 || month < 1 || month > 12 || day < 1 || day > 31)
                    return false;
                return true;
            },
            maxString: 10
        },
        {
            key: "category",
            question: "지출 카테고리를 입력하세요(10글자 이하): ",
            requestion: "지출 카테고리는 10글자 이하로 입력해주세요: ",
            defalt: () => '미분류',
            validate: (category) => {
                if(typeof category !== 'string')
                    throw new Error('category is not string');
                if(category.length > 10)
                    return false;
                return true;
            },
            maxString: 10
        },
        {
            key: "description",
            question: "상세 지출 내용을 입력하세요: ",
            requestion: "",
            defalt: () => '미입력상품',
            validate: (description) => {
                if(typeof description !== 'string')
                    throw new Error('description is not string');
                return true;
            },
            maxString: 0
        },
        {
            key: "price",
            question: "지출 금액을 입력하세요(단위: 원): ",
            defalt: () => "-1",
            beforValidate: (price) => {
                if(typeof price === 'string')
                    return parseInt(price);
                throw new Error('price is not string');
            },
            validate: (price) => {
                if(typeof price !== 'number')
                    throw new Error('price is not number');
                if(price < 0)
                    return false;
                return true;
            },
            maxString: 10
        }
    ];

    print() {
        console.log(``)
    }

    constructor(obj) {
        Record.#contents.forEach(({key}) => {
            if(obj[key] === undefined)
                throw new Error(`${key} is undefined`);
            this[key] = obj[key];
        });
    }

    static async createByInput(defaltRecord) {
        if(typeof defaltRecord != 'undefined' && defaltRecord instanceof Record === false)
            throw new Error('defaltRecord is not Record instance');
        const newRecord = {};
        await Record.#contents.mapSync(async (e) => newRecord[e.key] = await inputWithQuestion({
            ...e,
            defalt: typeof defaltRecord === 'undefined' ? e.defalt : defaltRecord[e.key]
        }));
        return new Record(newRecord);
    }

    static createByObject(obj) {
        return new Record(obj);
    }

    static createByArray(arr) {
        return new Record({
            date: arr[0],
            category: arr[1],
            description: arr[2],
            price: arr[3]
        });
    }

    static createByString(str) {
        return Record.createByArray(str.split(','));
    }

    static createByCSV(csv) {
        return csv.split('\n').map(e => Record.createByString(e));
    }

    static createByJSON(json) {
        return Record.createByCSV(json);
    }

    static createByRecords(records) {
        return records.map(e => Record.createByObject(e));
    }
}