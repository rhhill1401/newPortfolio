"use strict";
console.log('classes');
class CartItems {
    constructor(name) {
        this.name = name;
        this.checkOut = [];
        this.name = name;
    }
}
function addProduct(product, quantity) {
    customer1.checkOut.push({ product, quantity });
}
const customer1 = new CartItems('Terry');
addProduct('lotion', 80);
addProduct('sunscreen', 180);
console.log(customer1);
console.log(customer1.checkOut);
let checkcustomer1 = customer1.checkOut.map((items) => {
    let discount = 0.25 * items.quantity;
    let sale = items.quantity - discount;
    return ` Your disount is $${discount} resulting in a new price of $${sale}`;
});
console.log(checkcustomer1);
//# sourceMappingURL=classes.js.map