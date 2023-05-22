import './utils/appendPrototype.js';
import Menu from './utils/Menu.js';
import addRecord from './actions/addRecord.js';
import searchRecord from './actions/searchRecord.js';
import updateRecord from './actions/updateRecord.js';
import removeRecord from './actions/removeRecord.js';

const menu = Menu.createMenu(
    ["지출 내역 입력", addRecord],
    ["지출 내역 조회", searchRecord],
    ["지출 내역 수정", updateRecord],
    ["지출 내역 삭제", removeRecord],
    ["종료", process.exit]
);

(async () => {
    while (true) {
        await menu.selectMenu();
    }
})();