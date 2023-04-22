const calcOperations = {
    add: (num1, num2) => num1 + num2,
    substract: (num1, num2) => num1 - num2,
    multiply: (num1, num2) => num1 * num2,
    divide: (num1, num2) => (num2 !== '0' ? num1 / num2 : "Can't divide by zero"),
};

module.exports = { calcOperations };
