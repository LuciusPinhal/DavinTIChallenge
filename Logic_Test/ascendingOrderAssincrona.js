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

function askNumber() {
    const numbers = [];
    const totalNumbers = 6;

    for (let i = 1; i <= totalNumbers; i++) {
        rl.question(`Enter the ${i}th number: `, (num) => {
            const parsedNum = parseFloat(num);
            if (isNaN(parsedNum)) {
                console.log("Invalid input. Please enter a valid number.");
                askNumber(numbers); 
            } else {
                numbers.push(parsedNum); 
                if (i === totalNumbers) {
                    rl.close(); 
                    calculateAscendingOrder(numbers); 
                }
            }
        });
    }
}

function startProgram() {
    askNumber();
}

startProgram();
