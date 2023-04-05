
const [ , , ...args ] = process.argv;

const convertInputToSeconds = (args) => {
    let step = 3600;

    return args.reduce((prev, current) => {
        prev += step * parseInt(current);
        step /= 60;
        return prev; 
    }, 0) * 1000;
}

if (args.length !== 3) {
    console.log('Incorrect parameters! Please try again.');
} else {
    console.log('Timer started...')
    setTimeout(() => console.log('Timer finished'), convertInputToSeconds(args));
}

