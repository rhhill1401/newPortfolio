//#Map Method creates new array based on current array

// const prices = [20, 10, 30, 25, 15, 40, 80, 5];

// const salesPrices = prices.map(sale => {
//   return sale / 2;
// });
// console.log(salesPrices);

// const users = [
//   { name: 'gold star', price: 30 },
//   { name: 'mushroom', price: 70 },
//   { name: 'green shell', price: 10 },
//   { name: 'red star', price: 30 },
// ];

// const salePrice = users.map(sale => {
//   if (sale.price === 30) {
//     return { name: sale.name, price: sale.price / 2 };
//   } else return sale;
// });

// console.log(salePrice);

// //# Map to change status of string on an object
// const MarvelCharacters = [
//   { name: 'Thor', status: 'undefeated' },
//   { name: 'Hulk', status: 'undefeated' },
//   { name: 'SpiderMan', status: 'undefeated' },
//   { name: 'BlackPanther', status: 'undefeated' },
// ];

// const charStatus = MarvelCharacters.map(newstatus => {
//   if (newstatus.name === 'Thor') {
//     return { name: newstatus.name, status: 'defeated' };
//   } else return newstatus;
// });

// console.log(charStatus);

//#Filter Method
// const scores = [20, 30, 40, 50, 80];

// const scoreFilter = scores.filter(lowest => lowest < 30);

// console.log(scoreFilter);

//#reduce method does not return a new array buy a value

// const score = [10, 20, 60, 40, 70, 90, 30];

// const result = score.reduce((acc, curr) => {
//   if (curr > 40) {
//     acc++; //@ ++ adds up the number of curr over 40
//   }
//   return acc;
// }, 0); //@ 0 starts the count over the acc parammeter at 0

// console.log(result);

// const users = [
//   { name: 'mario', price: 30 },
//   { name: 'yoshi', price: 70 },
//   { name: 'mario', price: 10 },
//   { name: 'crystal', price: 30 },
// ];

// const newScore = users.reduce((acc, curr) => {
//   if (curr.name === 'mario') {
//     acc += curr.price;
//   }
//   return acc;
// }, 0);

// console.log(newScore);

//# find method returns the first item  in an array that meets a defined condition and STOPS
// const scores = [10, 5, 0, 40, 60, 10, 20, 70];

// const firstHighScore = scores.find(score => score > 50);

// console.log(firstHighScore);

//# Sort method

//* example one sorting strings
// const names = ['mario', 'mega-man', 'chun-li', 'yoshi', 'luigi'];

// names.sort(); //! this destructures the array not produce a new one
// console.log(names);

//* example two sorting numbers
// const scores = [10, 20, 30, 5, 70, 45];
// scores.sort((a, b) => a - b);
// console.log(scores);
//* example 3 - sorting objects

// const players = [
//   { name: 'mario', score: 20 },
//   { name: 'luigi', score: 10 },
//   { name: 'yoshi', score: 50 },
//   { name: 'yoshi', score: 30 },
//   { name: 'shaun', score: 70 },
// ];

// complex way of doing a sort comparing each score a and b
// players.sort((a, b) => {
//   if (a.score > b.score) {
//     return -1;
//   } else if (b.score > a.score) {
//     return 1;
//   } else {
//     return 0;
//   }
// });

//# Best way to sort

// players.sort((a, b) => b.score - a.score);
// //* returns largest at the top
// console.log(players);

//# Chaining an array method
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
