const operations = ['add', 'substract', 'multiply', 'divide'];
const isNumeric = (value) => typeof value === 'string' && !isNaN(value) && !isNaN(parseFloat(value));

module.exports = { operations, isNumeric };