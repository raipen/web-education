import { inputWithQuestion } from './IO.js';
import { date2String } from './convert.js';

export default class Record {
    //#contetns: [{ key: String, question: String, requestion: String, defalt: Function, validate: Function, beforeValidate: Function || undefined, maxString: Number(0 for INF) }]
    static #contents = [
        {
            key: "date",
            title: "날짜",
            question: "날짜를 입력하세요(YYYY-MM-DD): ",
            requestion: "잘못된 날짜 형식입니다. 다시 입력해주세요(YYYY-MM-DD): ",
            defalt: () => date2String(new Date()),
            validate: (date) => {
                if (typeof date !== 'string')
                    throw new Error('date is not string');
                if (date.match(/^\d{4}-\d{2}-\d{2}$/) === null)
                    return false;
                const [year, month, day] = date.split('-').map((num) => parseInt(num));
                if (year < 0 || month < 1 || month > 12 || day < 1 || day > 31)
                    return false;
                return true;
            },
            maxString: 10
        },
        {
            key: "price",
            title: "지출 금액",
            question: "지출 금액을 입력하세요(단위: 원): ",
            defalt: () => "-1",
            validate: (price) => {
                if (typeof price !== 'string')
                    throw new Error('price is not string');
                price = parseInt(price);
                if (isNaN(price))
                    return false;
                return true;
            },
            afterValidate: (price) => {
                if (Number(price) < 0)
                    return '미입력';
                return price + '원';
            },
            maxString: 10,
            padReverse: true
        },
        {
            key: "category",
            title: "지출 카테고리",
            question: "지출 카테고리를 입력하세요(10글자 이하): ",
            requestion: "지출 카테고리는 10글자 이하로 입력해주세요: ",
            defalt: () => '미분류',
            validate: (category) => {
                if (typeof category !== 'string')
                    throw new Error('category is not string');
                if (category.length > 10)
                    return false;
                return true;
            },
            maxString: 20
        },
        {
            key: "description",
            title: "상세 지출 내용",
            question: "상세 지출 내용을 입력하세요: ",
            requestion: "",
            defalt: () => '미입력상품',
            validate: (description) => {
                if (typeof description !== 'string')
                    throw new Error('description is not string');
                return true;
            },
            maxString: 0
        }
    ];

    static printTitle() {
        console.log(
            Record.#contents
                .map(({ title, maxString }) => title.padStart((maxString + title.lengthOfByte) / 2, ' ').padEnd(maxString, ' '))
                .join(' | ')
        );
    }

    print() {
        console.log(
            Record.#contents
                .map(({ key, maxString, padReverse }) => this[key][padReverse ? 'padStart' : 'padEnd'](maxString, ' '))
                .join(' | ')
        );
    }

    constructor(obj) {
        Record.#contents.forEach(({ key }) => {
            if (obj[key] === undefined)
                throw new Error(`${key} is undefined`);
            this[key] = obj[key];
        });
    }

    static async createByInput(defaltRecord) {
        if (typeof defaltRecord != 'undefined' && defaltRecord instanceof Record === false)
            throw new Error('defaltRecord is not Record instance');
        const newRecord = {};
        await Record.#contents.mapSync(async (e) => newRecord[e.key] = await inputWithQuestion({
            ...e,
            defalt: typeof defaltRecord === 'undefined' ? e.defalt : () => defaltRecord[e.key]
        }));
        return new Record(newRecord);
    }

    static createByObject(obj) {
        return new Record(obj);
    }

    static createByRecords(records) {
        return records.map(e => Record.createByObject(e));
    }
}