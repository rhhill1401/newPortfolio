//@ Examples of usage

// import { data } from 'jquery';

// //# Array
// const cost: Array<number> = [20, 10, 30, 25, 15, 40, 80, 5];

// //#  promise
// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(`This is done!`);
//   }, 2000);
// });

// promise.then(data => {
//   data.split('');
// });

// //# functions and objects
// //? by using extends allows you to specify that parameter T and U must be objects!
// function merge<T extends object, U extends object>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }

// const mergeObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
// console.log(mergeObj);

// //@ tuple is an array of mixed values and limited positions
// var mixedArray: [number, string];
// //* return must be a number or string
// mixedArray = [1, 'hello'];
// //! wont work because it MUST be number first then a string
// mixedArray = ['hello', 5];

// //# object and key

// function extractAndConvert<T extends object, U extends keyof T>(
//   obj: T,
//   key: U
// ) {
//   return 'Value: ' + obj[key];
// }

// console.log(extractAndConvert({ name: 'Max' }, 'name'));

// class DataStorage<T> {
//   private data: T[] = [];

//   addItem(item: T) {
//     this.data.push(item);
//   }
//   removeItem(item: T) {
//     this.data.splice(this.data.indexOf(item), 1);
//   }
//   getItems() {
//     return [...this.data];
//   }
// }

// const textStorage = new DataStorage<string>();
// textStorage.addItem('Max');
// textStorage.addItem('Terry');
// textStorage.removeItem('Max');
// console.log(textStorage.getItems());
