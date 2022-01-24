"use strict";
const high5 = function () {
    console.log('what👏🏾');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);
const addNumbers = function (num1, num2) {
    let result = num1 + num2;
    return result;
};
const subtractNumbers = function (num1, num2) {
    let result = num1 - num2;
    return result;
};
const numberCalculator = function (num1, num2, fn) {
    console.log(`This is the text part and this is the function ${fn(num1, num2)}`);
};
numberCalculator(2, 3, addNumbers);
numberCalculator(2, 3, subtractNumbers);
const newAddNumbers = () => {
    let result = 5 + 2;
    console.log(result);
};
document.body.addEventListener('click', newAddNumbers);
//# sourceMappingURL=functions.js.map