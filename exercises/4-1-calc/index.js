const { validateParameters } = require('../helpers.js');
const { calcOperations } = require('../calcOperations.js');

const [, , firstNumber, secondNumber, operation] = process.argv;

if (validateParameters(firstNumber, secondNumber, operation)) {
    console.log(`One or more parameters are invalid`);
} else {
    const operationFunc = calcOperations[operation];
    console.log(operationFunc(parseFloat(firstNumber), parseFloat(secondNumber)));
}
