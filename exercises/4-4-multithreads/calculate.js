module.exports = function calculate({ array }) {
    return array.reduce((acc, current) => {
        if (current % 3 === 0) {
            acc.push(current);
        }

        return acc;
    }, []).length;
} 