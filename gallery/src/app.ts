//#1
function getElement(selection: string) {
  let element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check ${selection} selector, no such class or element exists`
  );
}

//#2 attach all the properties to the Gallery Object

interface sources {
  src: string;
}
class Gallery {
  list = [...this.element.querySelectorAll('.img')];
  modal = getElement('.modal');
  modalImg = getElement('.main-img');
  modalImages = getElement('.modal-images');
  closeBtn = getElement('.close-btn');
  nextBtn = getElement('.next-btn');
  prevBtn = getElement('.prev-btn');
  imageName = getElement('.image-name');
  container = this.element;

  constructor(
    public element: { querySelectorAll: Function; addEventListener: Function }
  ) {
    this.container = element;
    //* turn nodelist to an array
    this.list = [...element.querySelectorAll('.img')];
    //* target
    this.modal = getElement('.modal');
    this.imageName = getElement('.image-name');
    this.modalImg = getElement('.main-img');
    this.modalImages = getElement('.modal-images');
    this.closeBtn = getElement('.close-btn');
    this.nextBtn = getElement('.next-btn');
    this.prevBtn = getElement('.prev-btn');

    //@bind function
    // this.openModal = this.openModal.bind(this); //@ You must bind the modal to the gallary by using  bind(this)
    //container is on the left of this so the openModel function is referring to the container instead of the Gallery
    this.container.addEventListener(
      'click',
      (e: { target: HTMLImageElement }) => {
        if (e.target.classList.contains('img')) {
          this.openModal(e.target, this.list);
        }
      }
    );
  }

  //# 3 create a function to open Modal and add the class open
  openModal<Z>(selectedImage: Z, list: string[]) {
    this.setMainImage(selectedImage);
    this.modalImages.innerHTML = list
      .map((image: any): string => {
        return `<img src="${image.src}/>`;
      })
      .join('');
    this.modal.classList.add('open');
  }

  setMainImage<T, U extends sources>(selectedImage: {
    modalImg: T;
    src: U;
    title: string;
  }) {
    this.modalImg.src = selectedImage.src;
    this.imageName.textContent = selectedImage.title;
  }
}

//#3
const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));

console.log(nature);
