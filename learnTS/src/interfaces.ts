// //# adding a ? makes a property optional in this example major is set to optional
// interface Named {
//   readonly major: string;
//   readonly minor?: string;
// }

// interface Greetable extends Named {
//   readonly name: string; //* ensures name cannot be changed outside the scope by using =

//   greet(phrase: string): void;
//   calcAge(): void;
// }

// class Person implements Greetable {
//   name: string;
//   dob: number;
//   major: string;
//   minor?: string;
//   constructor(name: string, dob: number, major: string, minor?: string) {
//     this.name = name;
//     this.dob = dob;
//     this.major = major;
//     this.minor = minor;
//   }

//   //# since major is optional in the contructor if the object does not have a paramter the IF ELSE applies

//   greet(phrase: string) {
//     if (this.minor) {
//       console.log(`${phrase} ${this.name} with this minor ${this.minor}`);
//       return this;
//     } else console.log(`${this.name} has no minor!`);
//   }
//   calcAge() {
//     console.log(2021 - this.dob);
//   }
// }

// let user1: Greetable;

// user1 = new Person('Terry', 1975, 'Art', 'Physics');

// // user1.name = 'John';

// user1.greet('Hello');
// user1.calcAge();

interface Character {
  scores: number[];
  superHeros: string[];
  name: string;
  score: number;
  addScores(score: number): void;
  addHeroes(name: string): void;
}

class SuperHeroes implements Character {
  scores: number[];
  superHeros: string[];

  constructor(public name: string, public score: number) {
    this.name = name;
    this.score = score;
    this.scores = [];
    this.superHeros = [];
  }
  addScores(score: number) {
    this.scores.push(score);
    return this;
  }
  addHeroes(name: string) {
    this.superHeros.push(name);
    return this;
  }
}

const Thor = new SuperHeroes('Thor', 200);
const Hulk = new SuperHeroes('Hulk', 200);

Thor.addHeroes('Hulk')
  .addScores(600)
  .addScores(800)
  .addHeroes('SpiderMan')
  .addHeroes('IronMan');

const strongest = Thor.superHeros.filter(strong => strong === 'Hulk');
console.log(Thor.scores);
console.log(Thor.superHeros);
console.log(strongest);
Thor.superHeros.sort();
console.log(Thor.superHeros.sort());
console.log(Thor);
