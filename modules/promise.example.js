import get from './functions/singleselector.js';
//* callbacks, promises, async/await

const heading1 = get('.one');
const heading2 = get('.two');
const heading3 = get('.three');
const cbtn = get('.btns');
const imgContainer = get('.img-container');
const url = 'https://source.unsplash.com/random';

cbtn.addEventListener('click', () => {
  loadImage(url)
    .then(data => imgContainer.appendChild(data))
    .catch(err => console.log(err));
});

function loadImage(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.addEventListener('load', () => {
      resolve(img);
    });
    img.addEventListener('error', () => {
      reject(new Error(`Error loading image from the source : ${url}`));
    });
    img.src = url;
  });
}
