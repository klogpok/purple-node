
const { Worker } = require('worker_threads');
const { performance, PerformanceObserver } = require('perf_hooks');
const calculate = require('./calculate.js');
const cores = 4;

process.env.UV_THREADPOOL_SIZE = cores;

const performanceObserver = new PerformanceObserver((items) => {
	items.getEntries().forEach((entry) => {
		console.log(`${entry.name}: ${entry.duration}`);
	});
});

performanceObserver.observe({ entryTypes: ['measure'] });

const arr = Array.from({length: 30000000}, (v, i) => i);

const getChunkedArray = (array) => {
    const chunkSize = Math.ceil(array.length / cores);
    const resultArray = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        resultArray.push(chunk);
    }

    return resultArray;
}

const chunkedArray = getChunkedArray(arr);

const withoutWorkersCalc = (array) => {
    performance.mark('start');
    calculate({array});
    performance.mark('end');
    performance.measure('without workers', 'start', 'end');
}

const singleWorkerCalc = (array) => {
	return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
			workerData: { array }
		});

		worker.on('message', (msg) => {
			resolve(msg);
		});

        worker.on('error', (msg) => {
			reject(msg);
		});
	});
};

const withWorkersCalc = async (array) => {
	try {
        performance.mark('start');

        await Promise.all(array.map(arr => singleWorkerCalc(arr)));

        performance.mark('end');
		performance.measure('with workers', 'start', 'end');     
	} catch (e) {
		console.error(e.message);
	}
};

withoutWorkersCalc(arr);
withWorkersCalc(chunkedArray);