const EventEmitter = require('events');
const { add } = require('./add.js');
const { substract } = require('./substract.js');
const { multiply } = require('./multiply.js');
const { divide } = require('./divide.js');

const { operations, isNumeric } = require('../helpers.js');

const firstNumber = process.argv[2];
const secondNumber = process.argv[3];
const operation = process.argv[4];

const calcEmitter = new EventEmitter();

calcEmitter.on('result', result => console.log(result));

calcEmitter.on('add', (num1, num2) => {
    calcEmitter.emit('result', add(num1, num2));    
});

calcEmitter.on('substract', (num1, num2) => {
    calcEmitter.emit('result', substract(num1, num2));    
});

calcEmitter.on('multiply', (num1, num2) => {
    calcEmitter.emit('result', multiply(num1, num2));    
});

calcEmitter.on('divide', (num1, num2) => {
    calcEmitter.emit('result', divide(num1, num2));    
});

if (!isNumeric(firstNumber) || !isNumeric(secondNumber) || !operations.includes(operation)) {
    calcEmitter.emit('result', 'One or more parameters are invalid');
} else {
    calcEmitter.emit(operation, firstNumber, secondNumber);
}