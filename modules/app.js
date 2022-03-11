import { people } from './utils/data.js';
import get from './functions/singleselector.js';
import showPeople from './functions/peopleMap.js';

const container = get('.container');
const btn = get('.btn');

btn.addEventListener('click', () => {
  container.innerHTML = showPeople(people);
});

// const heading1 = get('.one');
// const heading2 = get('.two');
// const heading3 = get('.three');

// const nbtn = get('.btns');

// nbtn.addEventListener('click', () => {
//   setTimeout(() => {
//     heading1.style.color = 'red';
//     setTimeout(() => {
//       heading2.style.color = 'green';
//       setTimeout(() => {
//         heading3.style.color = 'blue';
//       }, 1000);
//     }, 2000);
//   }, 1000);
// });

//Make Soup
//boil water 10 min
//chop carrots 10 min
// add carrots boil for 5 min
//chop onion for 5 min
// add onion boil for  min
//Browser!!!! Fetch Data, Get Geolacation, set Timeout, setTimer etc...

// function boilwater() {
//   console.log('boiling...');
//   setTimeout(() => {
//     console.log('done boiling water for 10 minutes');
//     console.log('done chopping carrots');
//     console.log('add carrots to boil for 5 minutes');
//     setTimeout(() => {
//       console.log('carrots done boiling for 5 minutes');
//       console.log('add onions to boil for 5 minutes');
//     }, 5000);
//     console.log('chop onions for 5 minutes');
//     setTimeout(() => {
//       console.log('meal complete');
//     }, 5000);
//   }, 10000);
//   console.log('chop carrots');
// }

// boilwater();
// console.log(`I am first`);
// console.log(`I am second`);
// console.log(`I am third`);

// function boilingWater() {
//   for (let i = 0; i < 10000; i++) {
//     console.log('still not done...');
//   }
//   console.log('done.');
// }
