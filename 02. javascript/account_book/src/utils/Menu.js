import { inputWithQuestion } from './IO.js';

export default class Menu {
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

    async selectMenu(question = "메뉴를 선택해주세요: ", requestion = "잘못된 메뉴입니다. 다시 선택해주세요: "){
        this.menus.forEach(({description}, index) => {
            console.log(`${index + 1}. ${description}`);
        });
        const selected = await inputWithQuestion({
            question: question,
            requestion: requestion,
            validate: (e) => !isNaN(e) && e >= 1 && e <= this.menus.length
        });
        await this.menus[selected - 1].action();
    }
}