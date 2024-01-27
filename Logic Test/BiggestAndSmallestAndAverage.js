const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateStatistics(numbers) {
    console.log(numbers);

    let quantity = numbers.length;
    let sum = 0;
    let largest = 0;
    let smallest = 0;
    let isFirstNumber = true;


    numbers.forEach(number => {
        sum += number;
        if (isFirstNumber) {
            largest = number;
            smallest = number;
            isFirstNumber = false;
        } else {
            if (number > largest) {
                largest = number;
            }
            if (number < smallest) {
                smallest = number;
            }
        }
    });

    const average = sum / quantity;
    console.log(`Largest number: ${largest}`);
    console.log(`Smallest number: ${smallest}`);
    console.log(`Average: ${average}`);
}

function startProgram() {
    const randomNumbers = [];
    for (let i = 0; i < 400; i++) {
        randomNumbers.push(generateRandomNumber(-1000, 1000));
    }

    calculateStatistics(randomNumbers);

    rl.question("Do you want to continue? (Y/N): ", (response) => {
        if (response.toUpperCase() === 'Y') {
            startProgram();
        } else {
            rl.close();
        }
    });
}

startProgram();
