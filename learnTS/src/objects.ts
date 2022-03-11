// function UserCreator(
//   this: { name: string; score: number },
//   name: string,
//   score: number
// ) {
//   this.name = name;
//   this.score = score;
// }

// UserCreator.prototype.increment = function () {
//   this.score++;
// };
// UserCreator.prototype.login = function () {
//   console.log('login');
// };

// const user1 = new UserCreator('Eva', 9);
// user1.increment();

// console.log(user1);

class UserCreator {
  constructor(public name: string, public score: number) {
    this.name = name;
    this.score = score;
  }

  increment() {
    this.score++;
  }
  login() {
    console.log('login');
  }
}

// const user1 = new UserCreator('Eva', 9);
// user1.increment();

// console.log(user1);

// function userCreator(name: string, score: number) {
//   const newUser = Object.create(FunctionStore);
//   newUser.name = name;
//   newUser.score = score;
//   return newUser;
// }

// const FunctionStore = {
//   increments: function (this) {
//     this.score++;
//   },
//   login: function () {
//     console.log("You're loggedin");
//   },
// };

// const user3 = userCreator('Terry', 3);
// const user4 = userCreator('Dina', 7);

// user3.increments();

// console.log(user3);
