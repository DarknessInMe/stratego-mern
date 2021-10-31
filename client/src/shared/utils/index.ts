const deepCopy = <T>(value: T) => {
    return JSON.parse(JSON.stringify(value)) as T
};

export { deepCopy };