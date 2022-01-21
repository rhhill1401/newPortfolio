//# creating a class
// class Department {
//   name: string; //* this is not a key value pair but a field

//   constructor(n: string) {
//     this.name = n;
//   }
// }
// const accounting = new Department('Accounting');

// console.log(accounting);
//# union types example combines numbet and strings
// const combineNumbers = (a: number | string, b: number | string) => {
//   let result;
//   if (typeof a === 'number' && typeof b === 'number') {
//     result = a + b;
//   } else result = a.toString() + b.toString();
//   console.log(result);
// };

// combineNumbers('tom ', 'brady');

// //# functions
// function add(num1: number, num2: number) {
//   return num1 + num2;
// }

// //*  lets typescript know that calculate will always be a function

// let calculate: Function;
// calculate = add;

// console.log(calculate(2, 2));

// //# function call backs

// function addAndHandler(num1: number, num2: number, cb: (num: number) => void) {
//   const result = num1 + num2;
//   cb(result); //@ just defines the result
// }

// addAndHandler(10, 20, result => {
//   console.log(result);
// });

// function noHandler(num1: number, num2: number) {
//   const result = num1 + num2;
//   return result;
// }

// console.log(noHandler(10, 20));

// const addArrow = (num1: number, num2: number) => num1 - num2;

// console.log(addArrow(10, 2));
