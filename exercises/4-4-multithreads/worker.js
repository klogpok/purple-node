const { parentPort, workerData } = require('worker_threads');
const calculate = require('./calculate.js');

parentPort.postMessage(calculate(workerData));