const [, , ...args] = process.argv;

const periods = {
    h: { secondsInPeriod: 3600, limit: 240 },
    m: { secondsInPeriod: 60, limit: 60 },
    s: { secondsInPeriod: 1, limit: 60 },
};

const convertInputToSeconds = (args) => {
    return args.reduce((acc, current) => {
        let periodPrefix = current.slice(-1);
        return parseInt(current) * periods[periodPrefix].secondsInPeriod;
    }, 0);
};

// If some arg is invalid returns false
const isValidInput = (args) => {
    return args.some((arg) => {
        let periodPrefix = arg.slice(-1);
        let periodValue = arg.substring(0, arg.length - 1);
        return (
            !(periodPrefix in periods) ||
            !isNumeric(periodValue) ||
            validatePeriodLimit(periodPrefix, periodValue)
        );
    });
};

const validatePeriodLimit = (periodPrefix, periodValue) =>
    periodValue < 0 && periodValue > periods[periodPrefix].limit;

const isNumeric = (value) => typeof value === 'string' && !isNaN(value) && !isNaN(parseInt(value));

if (isValidInput(args)) {
    console.log('Incorrect parameters! Please keep to format: [h m s]');
} else {
    console.log('Timer started...');
    setTimeout(() => console.log('Timer finished'), convertInputToSeconds(args) * 1000);
}
