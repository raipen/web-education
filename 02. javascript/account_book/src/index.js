const { createMenu } = require('./utils/Menu');

const menu = createMenu(
    ["지출 내역 입력", require('./actions/addRecord')],
    ["지출 내역 조회", require('./actions/searchRecord')],
    ["지출 내역 수정", require('./actions/updateRecord')],
    ["지출 내역 삭제", require('./actions/removeRecord')],
    ["종료", process.exit]
);

(async () => {
    while (true) {
        await menu.selectMenu();
    }
})();