const divide = (num1, num2) => (num2 !== '0') ? parseFloat(num1) / parseFloat(num2) : "Can't divide by zero";

module.exports = { divide };