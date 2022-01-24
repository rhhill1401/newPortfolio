const fruit = ['apple', 'pear', 'bannana', 'orange'];

//* old way before ES6 example
// const apple = fruit[0];
// const bannana = fruit[2];
// const pear = fruit[1];

// console.log(apple, fruit, pear);

//* New Way ES6

const [apple, pear, banana, orange] = fruit;

console.log(apple, pear, banana);

//* swapping variables
let first = 'bob';
let second = 'john';
[second, first] = [first, second];

console.log(first, second);
