const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculateAscendingOrder(numbers) {
    numbers.sort((a, b) => a - b);

    console.log("Numbers in ascending order:");
    numbers.forEach((number, index) => {
        console.log(index + 1 + "th: ", number);
    });
}

function askNumber(numbers, index) {
    rl.question(`Enter the ${index + 1}th number: `, (num) => {
        const parsedNum = parseFloat(num);
        if (isNaN(parsedNum)) {
            console.log("Invalid input. Please enter a valid number.");
            askNumber(numbers, index); 
        } else {
            numbers.push(parsedNum); 
            if (index === 5) {
                rl.close(); 
                calculateAscendingOrder(numbers);
            } else {
                askNumber(numbers, index + 1);
            }
        }
    });
}

function startProgram() {
    const numbers = [];
    askNumber(numbers, 0); 
}

startProgram();
