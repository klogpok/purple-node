const { calcOperations } = require('./calcOperations');

const isNumeric = (value) =>
    typeof value === 'string' && !isNaN(value) && !isNaN(parseFloat(value));

const validateParameters = (firstNumber, secondNumber, operation) => {
    return !isNumeric(firstNumber) || !isNumeric(secondNumber) || !(operation in calcOperations);
};

module.exports = { validateParameters };
