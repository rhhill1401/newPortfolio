console.log('classes');

class CartItems {
  checkOut = [] as any;

  constructor(
    public name: string // public product: string, // public quantity: number
  ) {
    this.name = name;
  }
}

function addProduct(product: string, quantity: number) {
  customer1.checkOut.push({ product, quantity });
}
const customer1 = new CartItems('Terry');

addProduct('lotion', 80);
addProduct('sunscreen', 180);

console.log(customer1);
console.log(customer1.checkOut);

let checkcustomer1 = customer1.checkOut.map((items: any) => {
  let discount = 0.25 * items.quantity;
  let sale = items.quantity - discount;
  return ` Your disount is $${discount} resulting in a new price of $${sale}`;
});

console.log(checkcustomer1);
//   constructor(public name: string, public birthYear: number) {
//     this.name = name;
//     this.birthYear = birthYear;
//   }

//   age(birthYear: number) {
//     return 2021 - birthYear;
//   }
// }

// const calcAge = function (name: string, birthYear: number, fn: Function) {
//   console.log(` Your name is ${name} and you are ${fn(birthYear)}`);
// };
// const person1 = new Person('Terry', 1975);

// calcAge('Terry', 1975, person1.age);

// console.log('classes');
// class SimpleSearch {
//   // id: number;
//   // private title: string; //#  can only be accessd within a class
//   newItems: string[] = [];

//   constructor(protected readonly id: number, protected title: string) {
//     //# using protected instead of private allows exended class to use argument
//     this.id = id;
//     this.title = title;
//   }

//   describe(this: SimpleSearch) {
//     //# adding this refers to only objects in this class
//     console.log(`This is ${this.title} with the id of ${this.id}`);
//     return this;
//   }

//   addSearchItem(title: string) {
//     this.newItems.push(title);

//     return this;
//   }
//   printSearchItems() {
//     console.log(this.newItems.length);
//     console.log(this.newItems);
//     return this;
//   }
// }

// class newSearch extends SimpleSearch {
//   private lastReport: string;

//   get mostRecentReport() {
//     if (this.lastReport) {
//       return this.lastReport;
//     }
//     throw new Error('No last report found');
//   }

//   set mostRecentReport(value: string) {
//     if (!value) {
//       throw new Error('Please pass in a value');
//     }
//     this.addReport(value);
//   }

//   constructor(
//     number: number,
//     title: string,
//     public department: string,
//     public reports: string[]
//   ) {
//     super(number, title); //# allows a class to be extended; you most include the same arguments in the parent class

//     this.department = department;
//     this.lastReport = reports[0];
//   }

//   addReport(title: string) {
//     this.lastReport = title;
//     this.reports.push(title);

//     return this;
//   }

//   newDescribe() {
//     console.log(
//       `This is ${this.title} with the id of ${this.id} in the ${this.department}) department`
//     );
//   }
// }

// const searchItem = new SimpleSearch(1, 'first postion');

// const newSearchItem = new newSearch(
//   1,
//   'fourthPosition',
//   'Accounting',
//   []
// ).addReport('Getter ');
// newSearchItem.mostRecentReport = 'Year end Report';
// // searchItem.title = 'frank'; //# cannot be changed outside the class because private was assigned
// searchItem.describe().addSearchItem('first Title');
// searchItem.describe().addSearchItem('second Title');
// searchItem.describe().addSearchItem('third Title');
// searchItem.printSearchItems();
// newSearchItem.newDescribe();

// newSearchItem.addReport('science');
// newSearchItem.addReport('science1');

// console.log(newSearchItem.reports);

// class Person {
//   constructor(public name: string, public birthYear: number) {
//     this.name = name;
//     this.birthYear = birthYear;
//   }
//   calcAge() {
//     console.log(2021 - this.birthYear);
//     return this;
//   }
// }

// let Terry = new Person('name', 1975).calcAge();
// console.log(Terry);

// class PersonMaker {
//   constructor(public name: string, public dob: number) {
//     this.name = name;
//     this.dob = dob;
//   }

//   calcAge(dob: number) {
//     console.log(2021 - dob);
//     return this;
//   }
// }

// //#  to inherite from parent you must EXTEND and add SUPER
// class Student extends PersonMaker {
//   constructor(public name: string, public dob: number, public major: string) {
//     super(name, dob);
//   }

//   details() {
//     console.log(`Name: ${this.name}, DOB: ${this.dob} Major: ${this.major}`);
//     return this;
//   }

//   //# callback function

//   transform(fn: Function) {
//     let result = ` ${fn(this.dob)}`;
//     return result;
//   }
// }

// const Terry = new Student('Terry', 1975, 'Computer Science');

// // Terry.details(1975).calcAge();
// Terry.details();
// Terry.transform(Terry.calcAge);
