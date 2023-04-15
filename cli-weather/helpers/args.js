const getArgs = (args) => {
    const res = {};
    const [, , ...rest] = args;

    rest.forEach((value, index, array) => {
        if (value.startsWith('-')) {
            const nextValue = array[index + 1];
            res[value.substring(1)] = nextValue && !nextValue.startsWith('-') ? nextValue : true;
        }
    });

    return res;
};

export { getArgs };
