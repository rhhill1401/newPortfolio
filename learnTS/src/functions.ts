// class Person {
//   constructor(
//     public name: string,
//     public dob: number,
//     public favoriteMovie: string
//   ) {
//     this.name = name;
//     this.dob = dob;
//     this.favoriteMovie = favoriteMovie;
//   }
//   calcAge() {
//     return 2021 - this.dob;
//   }
// }

// const Ocean = new Person('Ocean', 2016, 'Enter the Interverse');

// // Person.prototype.species = 'Homo Sapiens';
// console.log(Ocean);

// // //@ old way of making classes with prototypes

// const PersonClone = function (this: any, firstName: string, dob: number) {
//   this.firstName = firstName;
//   this.dob = dob;
// };

// //# to create a new method and attach to the constructor use prototype

// PersonClone.prototype.calcAge = function (): number {
//   return 2021 - this.dob;
// };

// const Student = function (
//   this: any,
//   firstName: string,
//   dob: number,
//   major: string
// ) {
//   this.firstName = firstName;
//   this.dob = dob;
//   this.major = major;
// };
// //# to Inherit from parent(PersonClone) you must set the constructor to the parents prototype
// Student.prototype = Object.create(PersonClone.prototype);

// Student.prototype.detail = function (): string {
//   return `Name: ${this.firstName},  DOB: ${this.dob},  Major: ${this.major}`;
// };

// const Milan = new Student('Milan', 2015, 'Art');

// console.log(Milan.detail());

//   km = 1.60934;
//   constructor(public make: string, public speed: number) {
//     (this.make = make), (this.speed = speed);
//   }
//   accelerate() {
//     let result = Math.trunc((this.speed += 10));
//     console.log(`${this.make} going at ${result} km/h`);
//     return this;
//   }
//   brake() {
//     let result = (this.speed -= 5);
//     console.log(`${this.make} breaking at ${result} km/h`);
//     return this;
//   }

// //   //# allows to set a new value to an argument in this case speed has been altered
//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   //# allows you to alter the value by passing a paramter to set the new value against
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const car1 = new Car('Ford', 120);
// console.log(car1.speedUS);
// car1.speedUS = 75;
// console.log(car1.speed);
// console.log(car1);
// const tranformText = function (text: string) {
//   return text.toUpperCase();
// };

// function reverseString(str: string) {
//   return str.toUpperCase().split('').reverse().join('');
// }

// const callBackF = (text: string, fn: Function, nFn: Function) => {
//   //@function callBackF will invoke the first parameter

//   console.log(`My name in uppercase is ${fn(text)}`);
//   console.log(`My name reverse is ${nFn(text)}`);
// };

// callBackF('dina', tranformText, reverseString);

// function upperCaseName(text: string, fn: Function) {
//   console.log(fn(text));
// }

// upperCaseName('Terry', tranformText);

// const Marvel = {
//   character: 'Hulk',
//   code: 'HS',
//   powers: [] as string[],
//   upgrade(charName: String, level: number) {
//     console.log(
//       `For your character:  ${this.character}, You have updates your character, Name: ${charName},  level:  ${level}, Your code is ${this.code}`
//     );
//     this.powers.push('Hulk Smash', 'SpiderMan');
//   },
// };

// Marvel.upgrade('ultimate', 900);
// console.log(Marvel.powers);

// const DC = {
//   character: 'Batman',
//   code: 'DK',
//   powers: [] as string[],
// };

//@ Call method applies the THIS t the new object  the function upgrade can now be used as by adding DC to the paramaters it will reference all arguments to DC and not Marvel
// const upgrade = Marvel.upgrade;
// upgrade.call(DC, 'Dark', 2999);

// DC.powers.push('stealth');

// console.log(DC.powers);

// const Universe = {
//   character: 'Wonder Woman',
//   code: 'WW',
//   powers: [] as string[],
// };

//@Apply Method - no used anymore
// const characterData = ['tactile', 6000] as [string, number];
// upgrade.apply(Universe, characterData);

//@ better method use spread operatir with a tuple
// const characterData = ['tactile', 6000] as [string, number];
// upgrade.call(Universe, ...characterData);
// const charPowers = function (name: string) {
//   return function (power: string) {
//     console.log(`This ${name} and he has a power of ${power}`);
//   };
// };

// const MarvelCharacter = charPowers('SpiderMan')('Web');

// charPowers('Hulk')('Strength');
// charPowers('Thor')('Lightning');

//@ Call Backs

// console.log('functions');

// const onWord = function (str: string) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str: string) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// // //@ Higher -order function

// const transformer = function (str: string, fn: Function) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);
//   console.log(`Transformed by: ${fn.name}`);
// };

// //@ upperFirstWord is the call back function

// transformer('This is a destructured function', upperFirstWord);

// //@  example of a call back function  in the example below the finction high 5 is the call back function

const high5 = function (): void {
  console.log('what👏🏾');
};

document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

//@ examples of call back functions

const addNumbers = function (num1: number, num2: number): number {
  let result = num1 + num2;
  return result;
};

const subtractNumbers = function (num1: number, num2: number): number {
  let result = num1 - num2;
  return result;
};

const numberCalculator = function (num1: number, num2: number, fn: Function) {
  //   //@ the call back fn is going to take what is in argument and do something to it whatever function is applied to num1 and num2 will return a result

  console.log(
    `This is the text part and this is the function ${fn(num1, num2)}`
  );
};

numberCalculator(2, 3, addNumbers);
numberCalculator(2, 3, subtractNumbers);

const newAddNumbers = () => {
  let result = 5 + 2;
  console.log(result);
};
document.body.addEventListener('click', newAddNumbers);
