// const numbers = ['terry', 1, 'James', 3, 4];

// for (let i = 0; i < numbers.length; i++) {
//   console.log(numbers[i]);
// }

// var customer = {{DLV - Customer}};
// var transaction = {{DLV - Transaction Current}};

// _ltk.Order.SetCustomer(customer.emailAddress, customer.firstName, customer.lastName);
// _ltk.Order.OrderNumber = transaction.orderId;
// _ltk.Order.ItemTotal = transaction.subtotal;
// _ltk.Order.ShippingTotal = transaction.shipping;
// _ltk.Order.TaxTotal = transaction.tax;
// _ltk.Order.HandlingTotal = 0;
// _ltk.Order.OrderTotal = transaction.total;

// for (i = 0; i < transaction.cartItems.length; i++)
// {
//   var item = transaction.cartItems[i];
// _ltk.Order.AddItem(item.sku, item.quantity, item.totalPrice);
// }

// _ltk.Order.Submit();
// })

let cartItem = [] as any;
let listTrack = [] as any;

class cartItemUDO {
  sku = 12455867;

  constructor(public quantity: number, public totalPrice: number) {
    this.quantity = quantity;
    this.totalPrice = totalPrice;
  }
}

class Customer {
  constructor(
    public emailAddress: string,
    public firstName: string,
    public lastName: string
  ) {
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

const saleprice = cartItem.map((value: number) => {
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
