import get from './functions/singleselector.js';
//@Must have async

//* example 1
// async function someFunction () {

// }
//* example 2

// const otherFunction = async() => {
//   await
// }

const heading1 = get('.one');
const heading2 = get('.two');
const heading3 = get('.three');
const cbtn = get('.btns');

cbtn.addEventListener('click', async () => {
  try {
    let first = addColor(1500, heading1, 'red');
    await addColor(1000, heading2, 'green');
    await addColor(1000, heading3, 'purple');
    console.log(first);
  } catch (error) {
    console.log(error);
  }
});

function addColor(time, element, color) {
  return new Promise((resolve, reject) => {
    if (element) {
      setTimeout(() => {
        element.style.color = color;
        resolve('hello');
      }, time);
    } else {
      reject(new Error(`There is no such element ${element}`));
    }
  });
}
