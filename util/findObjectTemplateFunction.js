/**
 * Higher order wrapper function for simplifying redundant code around finding an object
 * @param {*} findFunction function that returns an object value
 */
async function findObjectTemplateFunction(findFunction, name) {
    var obj = null;
    try {
        obj = await findFunction();
        if (!obj) {
            console.log(`findObjectTemplateFunction.js - findObjectTemplateFunction() - ${name} - Query returned no result`);
        }
    } catch (err) {
        console.log(`findObjectTemplateFunction.js - findObjectTemplateFunction() - ${name} - An error occurred while finding object: ${err}`);
        throw new Error("An error occurred while trying to find the desired resource");
    }
    return obj;
}

module.exports = findObjectTemplateFunction;