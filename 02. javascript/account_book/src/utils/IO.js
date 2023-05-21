const readline = require('readline');
const fs = require('fs');

const RECORDS_FILE = 'public/records.json';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const IO = {
    readFromStdIn: (question) => {
        return new Promise((resolve, reject) => {
            rl.question(question, (answer) => {
                answer = answer.trim();
                if(answer === '')
                    resolve(null);
                resolve(answer);
            });
        });
    },
    inputWithQuestion: async ({ question, requestion = question, defalt = () => null, validate = () => true, beforValidate = e => e, afterValidate = e => e }) => {
        let input = beforValidate(await IO.readFromStdIn(question) ?? defalt());
        while (!validate(input)) {
            input = beforValidate(await IO.readFromStdIn(requestion) ?? defalt());
        }
        return input;
    },
    readRecords: () => {
        return new Promise((resolve, reject) => {
            fs.readFile(RECORDS_FILE, (err, data) => {
                if (err) {
                    if(err.code === 'ENOENT')
                        resolve([]);
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });
    },
    writeRecords: (records) => {
        if (!fs.existsSync('public')) {
            fs.mkdirSync('public');
        }
        return new Promise((resolve, reject) => {
            fs.writeFile(RECORDS_FILE, JSON.stringify(records), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
};

module.exports = IO;