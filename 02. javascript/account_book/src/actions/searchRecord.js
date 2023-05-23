import { readRecords, inputWithQuestion } from '../utils/IO.js';
import Record from '../utils/Record.js';
import Menu from '../utils/Menu.js';

const all = async () => {
    const records = await readRecords();
    Record.printTitle();
    records.forEach((record) => {
        record.print();
    });
}

const searchCategory = async () => {
    const records = await readRecords();
    const categories = [...new Set(records.map((record) => record.category))];
    await Menu.createMenu(
        ...categories.map((category) => [category, () => {
            Record.printTitle();
            records.filter((record) => record.category === category).forEach((record) => {
                record.print();
            });
        }]),
        ["종료", process.exit]
    ).selectMenu();
}

const searchDescription = async () => {
    const [records, keyword] = await Promise.all[
        readRecords(),
        inputWithQuestion({
            question: "검색할 내용을 입력하세요: ",
            requestion: "검색할 내용을 입력하세요: ",
            validate: (e) => e !== null
        })
    ];
    Record.printTitle();
    records.filter((record) => record.description.includes(keyword)).forEach((record) => {
        record.print();
    });
}

export default async () => {
    await Menu.createMenu(
        ["전체 내역 조회", all],
        ["카테고리 조회", searchCategory],
        ["상세 내용 검색", searchDescription],
        ["종료", process.exit]
    ).selectMenu();
}