export const asyncFunc = str => new Promise(
    resolve => setTimeout(() => resolve(str ? str.length : 0), 1000)
);