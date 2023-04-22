const EventEmitter = require('events');
const { validateParameters } = require('../helpers.js');
const { calcOperations } = require('../calcOperations.js');

const [, , firstNumber, secondNumber, operation] = process.argv;
const calcEmitter = new EventEmitter();

calcEmitter.on('result', (result) => console.log(result));

for (const operation in calcOperations) {
    const operationFunc = calcOperations[operation];

    calcEmitter.on(operation, (num1, num2) => {
        calcEmitter.emit('result', operationFunc(parseFloat(num1), parseFloat(num2)));
    });
}

if (validateParameters(firstNumber, secondNumber, operation)) {
    calcEmitter.emit('result', 'One or more parameters are invalid');
} else {
    calcEmitter.emit(operation, firstNumber, secondNumber);
}
