const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Guess the number!");

const secretNumber = Math.trunc(Math.random() * 100) + 1;

async function ask() {
    while(true){
        let guess = await new Promise(resolve => {
            rl.question("What is your guess? ", resolve);
        });
        if(guess == secretNumber){
            console.log("You got it right!");
            break;
        } else if(guess > secretNumber){
            console.log("Too high!");
        } else {
            console.log("Too low!");
        }
    }
}

ask();