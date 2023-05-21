Array.prototype.mapSync = async function (fn) {
    const result = [];
    for(let i = 0; i < this.length; i++) {
        result.push(await fn(this[i]));
    }
    return result;
}

module.exports = {
    date2String: (date) => {
        if(date instanceof Date === false)
            throw new Error('date is not Date instance');
        const year = date.getFullYear();
        const [month, day] = [date.getMonth() + 1, date.getDate()].map((num) => num.toString().padStart(2, '0'));
        return `${year}-${month}-${day}`;
    },
    string2Date: (str) => {
        if(typeof str !== 'string')
            throw new Error('str is not string');
        const [year, month, day] = str.split('-').map(parseInt);
        return new Date(year, month - 1, day);
    }
}