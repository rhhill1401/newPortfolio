'use strict';

export const portThumbnails = [
  {
    id: 1,
    img: '/public/image/gal-1.png',
    title: 'Beta Fish',
    description: 'Lorem ipsum dolor sit amet, consectetur',
  },
  {
    id: 2,
    img: '/public/image/gal-2.png',
    title: 'Frog',
    description: 'Lorem ipsum dolor sit amet, consectetur',
  },
  {
    id: 3,
    img: '/public/image/gal-3.png',
    title: 'Octopus',
    description: 'Lorem ipsum dolor sit amet, consectetur',
  },
];

const btnScrollToTop = document.querySelector('#btnScrollToTop');

$(document).ready(function () {
  $('#btnScrollToTop').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
  });
});

const images = [];
let uploaded_image = '';

const gallery = document.getElementById('gallery');
const sImages = document.querySelector('#cards');

const selectedImage = document.getElementById('selectedImage');
const imageIndexes = [1, 2, 3];
const selectedIndex = null;

imageIndexes.forEach(i => {
  const image = document.createElement('img');

  image.src = `/public/image/gal-${i}.png`;
  image.classList.add('proj-listings');
  image.alt = `Image for portfolio ${i}`;

  image.addEventListener('click', () => {
    selectedImage.src = `/public/image/gal-${i}.png`;
    selectedImage.alt = `/public/image/gal-${i}.png`;
  });

  gallery.appendChild(image);
});

console.log(imageIndexes);
console.log(imageIndexes.sort());

window.addEventListener('DOMContentLoaded', () => {
  let newImages = portThumbnails
    .map(item => {
      return `  <div class="thumbnail-cards">
      <div class="container-thumbnails-imgs" >
        <img class="thumbnail-images" src="${item.img}">
      </div>
      <h1 class="thumbnail-text" >${item.title}</h1>
      <p class="thumbnail-text" >${item.description}</p>
    </div> `;
    })
    .join('');
  sImages.innerHTML = newImages;
});
