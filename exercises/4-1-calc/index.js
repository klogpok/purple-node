const { operations, isNumeric } = require('../helpers.js');

const firstNumber = process.argv[2];
const secondNumber = process.argv[3];
const operation = process.argv[4];

if (!isNumeric(firstNumber) || !isNumeric(secondNumber) || !operations.includes(operation)) {
    console.log(`One or more parameters are invalid`);
} else {
    let result = null;

    switch (operation) {
        case 'add':
            const { add } = require('./add.js');
            result = add(firstNumber, secondNumber);
            break;

        case 'substract':
            const { substract } = require('./substract.js');
            result = substract(firstNumber, secondNumber);
            break;

        case 'multiply':
            const { multiply } = require('./multiply.js');
            result = multiply(firstNumber, secondNumber);
            break;

        case 'divide':
            const { divide } = require('./divide.js');
            result = divide(firstNumber, secondNumber);
            break;
    }

    console.log(result);
}