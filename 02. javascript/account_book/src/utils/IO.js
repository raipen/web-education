import readline from 'readline';
import fs from 'fs';
import Record from './Record.js';

const RECORDS_FILE = 'public/records.json';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const readFromStdIn = (question) => {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            answer = answer.trim();
            if(answer === '')
                resolve(null);
            resolve(answer);
        });
    });
}

export const inputWithQuestion = async ({ question, requestion = question, defalt = () => null, validate = () => true, afterValidate = e => e }) => {
    let input = await readFromStdIn(question) ?? defalt();
    while (!validate(input)) {
        input = await readFromStdIn(requestion) ?? defalt();
    }
    return afterValidate(input);
}

export const readRecords = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(RECORDS_FILE, (err, data) => {
            if (err) {
                if(err.code === 'ENOENT')
                    resolve([]);
                reject(err);
            } else {
                resolve(Record.createByRecords(JSON.parse(data)));
            }
        });
    });
}

export const writeRecords = (records) => {
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