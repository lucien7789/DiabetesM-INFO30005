/**
 * Higher order wrapper function for simplifying redundant code around finding an object
 * @param {*} findFunction function that returns an object value
 */
async function findObjectTemplateFunction(findFunction, name) {
    var obj = null;
    try {
        obj = await findFunction();
        console.log("HELLO");
        console.log(obj);
        if (!obj) {
            console.log(`findObjectTemplateFunction.js - findObjectTemplateFunction() - ${name} - Query returned no result`);
        }
    } catch (err) {
        console.log(`findObjectTemplateFunction.js - findObjectTemplateFunction() - ${name} - An error occurred while finding object: ${err}`);
    }
    return obj;
}

module.exports = findObjectTemplateFunction;