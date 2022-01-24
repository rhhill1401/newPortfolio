import { portThumbnails } from './cards.js';
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
    displayAll(portThumbnails);
    const practice = document.querySelectorAll('#bitch');
    practice.forEach(image => {
        image.addEventListener('click', e => {
            let newWindow = e.currentTarget;
        });
    });
});
window.addEventListener('DOMContentLoaded', () => { });
function displayAll(pics) {
    let newImages = pics
        .map((item) => {
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
// *****************************Set date*************************************
const date = document.getElementById('date');
date.innerText = new Date().getFullYear();
// ***************************** close links *************************************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');
//* adjusts height dynamically by comparing heights of container of links parent height and child height
navToggle.addEventListener('click', function () {
    // linksContainer.classList.toggle('show-links');
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`;
    }
    else {
        linksContainer.style.height = 0;
    }
});
// *****************************  fixed navbars *************************************
const navBar = document.getElementById('nav');
const logo = document.querySelector('.logo');
const topLink = document.querySelector('.top-link');
window.addEventListener('scroll', function () {
    const scrollHeight = window.pageYOffset;
    const navHeight = navBar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        navBar.classList.add('fixed-nav');
        logo.classList.add('fixedLogo');
    }
    else {
        navBar.classList.remove('fixed-nav');
        logo.classList.remove('fixedLogo');
    }
    if (scrollHeight > 400) {
        topLink.classList.add('show-link');
    }
    else {
        topLink.classList.remove('show-link');
    }
});
// ***************************** smooth scroll  *************************************
const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach(link => {
    //*prevent default
    link.addEventListener('click', (e) => {
        e.preventDefault();
        //* navigate to specificspot
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        // console.log(id);
        let position = element === null || element === void 0 ? void 0 : element.offsetTop;
        window.scrollTo({
            left: 0,
            top: position,
        });
    });
});
//# sourceMappingURL=main.js.map