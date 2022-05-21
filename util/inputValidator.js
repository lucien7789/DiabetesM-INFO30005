module.exports = function(data, options) {
    if (data === undefined) {
        throw new Error("Data value is undefined");
    }
    if (options?.isNumber && isNaN(data)) {
        throw new Error("Data is not a numerical value");
    }
    if (options?.greaterThanZero && data < 0) {
        throw new Error("Data must be positive");
    }
}