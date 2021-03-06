import { portThumbnails } from './cards.js';
import { Skills } from './skills.js';

const images = [];
let uploaded_image = '';

const gallery: any = document.getElementById('gallery');
const sImages: any = document.querySelector('#cards');

const selectedImage: any = document.getElementById('selectedImage');
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
  displayAll(portThumbnails);
  const practice = document.querySelectorAll('#bitch');
  practice.forEach(image => {
    image.addEventListener('click', e => {
      let newWindow = e.currentTarget;
    });
  });
});

function displayAll(pics: any) {
  let newImages = pics
    .map((item: any) => {
      return `  <div class="thumbnail-cards">
      <div class="container-thumbnails-imgs" >
      <a href="${item.page}">
        <img class="thumbnail-images proj-listings" id="bitch"   src="${item.img}">
        <a/>
      </div>
      <h1 class="thumbnail-text" >${item.title}</h1>
      <p class="thumbnail-text" >${item.description}</p>
    </div> `;
    })
    .join('');
  sImages.innerHTML = newImages;
}

const keySkill = document.querySelector('.tech-skills')!;

let newImages = Skills.map((item: any) => {
  return `   
  <li>${item.skill}</li>
 
   
 `;
}).join('');
keySkill.innerHTML = newImages;

// *****************************Set date*************************************

const date: { innerText: string | number } = document.getElementById('date')!;
date.innerText = new Date().getFullYear();

// ***************************** close links *************************************
const navToggle = document.querySelector('.nav-toggle')!;
const linksContainer: any = document.querySelector('.links-container')!;
const links = document.querySelector('.links')!;

//* adjusts height dynamically by comparing heights of container of links parent height and child height
navToggle.addEventListener('click', function () {
  // linksContainer.classList.toggle('show-links');
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});
// *****************************  fixed navbars *************************************

const navBar: any = document.getElementById('nav')!;
const logo: any = document.querySelector('.logo')!;
const topLink: any = document.querySelector('.top-link')!;

window.addEventListener('scroll', function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navBar.getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    navBar.classList.add('fixed-nav');
    logo.classList.add('fixedLogo');
  } else {
    navBar.classList.remove('fixed-nav');
    logo.classList.remove('fixedLogo');
  }
  if (scrollHeight > 400) {
    topLink.classList.add('show-link');
  } else {
    topLink.classList.remove('show-link');
  }
});

// ***************************** smooth scroll  *************************************

const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(link => {
  //*prevent default
  link.addEventListener('click', (e: any) => {
    e.preventDefault();
    //* navigate to specificspot

    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);

    //* calculate the heights
    const navHeight = navBar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;

    const fixedNav = navBar.classList.contains('fixed-nav');
    let position = element!.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0;
  });
});
