"use strict";
const users = [
    { name: 'mario', price: 30 },
    { name: 'yoshi', price: 70 },
    { name: 'mario', price: 10 },
    { name: 'crystal', price: 30 },
];
const promos = users
    .filter(sale => sale.price === 30)
    .map(halfOff => {
    return `Item ${halfOff.name} is ${halfOff.price / 2} dollars `;
});
console.log(promos);
//# sourceMappingURL=arrays.js.map