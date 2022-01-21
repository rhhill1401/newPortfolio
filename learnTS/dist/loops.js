"use strict";
let cartItem = [];
let listTrack = [];
class cartItemUDO {
    constructor(quantity, totalPrice) {
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.sku = 12455867;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }
}
class Customer {
    constructor(emailAddress, firstName, lastName) {
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    addItem() {
        cartItem.push(itemUdo.sku, itemUdo.totalPrice, itemUdo.quantity);
        cartItem.reverse();
    }
}
const Terry = new Customer('rthill49@gmail.com', 'Terry', 'Hill');
const itemUdo = new cartItemUDO(1, 36.0);
Terry.addItem();
const saleprice = cartItem.map((value) => {
    let sale = `${itemUdo.sku} ${itemUdo.totalPrice - 10} ${itemUdo.quantity} `;
    return sale;
});
const listItem = function () {
    listTrack.push(saleprice);
    console.log(saleprice);
};
listItem();
console.log(saleprice);
console.log(cartItem);
console.log(listTrack);
//# sourceMappingURL=loops.js.map