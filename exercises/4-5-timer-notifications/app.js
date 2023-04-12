const [ , , ...args ] = process.argv;

const notifier = require('node-notifier');

const convertInputToSeconds = (args) => {
    let step = 3600;

    return args.reduce((prev, current) => {
        prev += step * parseInt(current);
        step /= 60;
        return prev; 
    }, 0) * 1000;
}

if (args.length !== 3) {
    notifier.notify('Incorrect parameters! Please try again');
} else {
    console.log('Timer started...');
    setTimeout(() => notifier.notify('Timer finished'), convertInputToSeconds(args));
}