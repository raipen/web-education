const { readFromStdIn } = require('./IO');

module.exports = class Menu {
    constructor() {
        this.menus = [];
    }

    /**
     * 
     * @param {String} description 
     * @param {function} action 
     */
    addMenu(description, action) {
        if(typeof description !== 'string')
            throw new Error('description must be a string');
        if(typeof action !== 'function')
            throw new Error('action must be a function');
        this.menus.push({description, action});
    }

    /**
     * 
     * @param {[string, function]} menus 
     */
    static createMenu(...menus) {
        const menu = new Menu();
        menus.forEach(([description, action]) => {
            menu.addMenu(description, action);
        });
        return menu;
    }

    async selectMenu() {
        this.menus.forEach(({description}, index) => {
            console.log(`${index + 1}. ${description}`);
        });
        let option = await readFromStdIn("메뉴를 선택해주세요: ");
        while (isNaN(option) || option < 1 || option > this.menus.length) {
            option = await readFromStdIn("잘못된 메뉴입니다. 다시 선택해주세요: ");
        }
        await this.menus[option - 1].action();
    }
}