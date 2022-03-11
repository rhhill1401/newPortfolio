"use strict";
function getElement(selection) {
    let element = document.querySelector(selection);
    if (element) {
        return element;
    }
    throw new Error(`Please check ${selection} selector, no such class or element exists`);
}
class Gallery {
    constructor(element) {
        this.element = element;
        this.list = [...this.element.querySelectorAll('.img')];
        this.modal = getElement('.modal');
        this.modalImg = getElement('.main-img');
        this.modalImages = getElement('.modal-images');
        this.closeBtn = getElement('.close-btn');
        this.nextBtn = getElement('.next-btn');
        this.prevBtn = getElement('.prev-btn');
        this.imageName = getElement('.image-name');
        this.container = this.element;
        this.container = element;
        this.list = [...element.querySelectorAll('.img')];
        this.modal = getElement('.modal');
        this.imageName = getElement('.image-name');
        this.modalImg = getElement('.main-img');
        this.modalImages = getElement('.modal-images');
        this.closeBtn = getElement('.close-btn');
        this.nextBtn = getElement('.next-btn');
        this.prevBtn = getElement('.prev-btn');
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('img')) {
                this.openModal(e.target, this.list);
            }
        });
    }
    openModal(selectedImage, list) {
        this.setMainImage(selectedImage);
        this.modalImages.innerHTML = list
            .map((image) => {
            return `<img src="${image.src}/>`;
        })
            .join('');
        this.modal.classList.add('open');
    }
    setMainImage(selectedImage) {
        this.modalImg.src = selectedImage.src;
        this.imageName.textContent = selectedImage.title;
    }
}
const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));
console.log(nature);
