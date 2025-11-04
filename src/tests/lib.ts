const average = (array: number[]) => {
    const total = array.reduce((acc, curr) => acc + curr, 0);
    return total / array.length;
}
const getMin = (array: number[]) => {
    return Math.min(...array);
}   

export { average, getMin };

