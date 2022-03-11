import get from './functions/singleselector.js';
//* callbacks, promises, async/await

const heading1 = get('heading1');
const heading2 = get('.two');
const heading3 = get('.three');
const cbtn = get('.btns');

cbtn.addEventListener('click', () => {
  addColor(1000, heading1, 'red')
    .then(() => addColor(1000, heading1, 'green'))
    .then(() => addColor(2000, heading3, 'blue'))
    .catch(err => console.log(err));
});

function addColor(time, element, color) {
  return new Promise((resolve, reject) => {
    if (element) {
      setTimeout(() => {
        element.style.color = color;
        resolve();
      }, time);
    } else {
      reject(new Error(`There is no such element ${element}`));
    }
  });
}
