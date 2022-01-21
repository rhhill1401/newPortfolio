import { menu } from './array.js';

const sectionCenter: any = document.querySelector('.section-center');
const container: any = document.querySelector('.btn-container');

//* load all items
window.addEventListener('DOMContentLoaded', () => {
  display(menu);
  displayBtns();
});

//* disply images  function
function display(menu: any) {
  let display: any = menu.map((items: any) => {
    return ` <article class="menu-item">
    <img src="${items.img}" class="photo" alt="menu-item">

    <div class="item-info">
      <header>
        <h4>${items.title}</h4>
        <h4 class="price">${items.price}</h4>
      </header>
     ${items.desc}
    </div>
  </article>`;
  });
  display = display.join('');
  sectionCenter.innerHTML = display;
}

//* buttons to filter items
function displayBtns() {
  const categories = menu.reduce(
    //@ value is the array ["all"] items is all the items in the menu array
    (values: string[], item: any) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ['all']
  );

  const categoryBtns = categories
    .map(category => {
      return `<button class="filter-btn" 
      type="button"
       data-id="${category}">${category}</button>`;
    })
    .join('');
  container.innerHTML = categoryBtns;
  const fltbtn = document.querySelectorAll('.filter-btn');

  //* filter items
  fltbtn.forEach(btn => {
    btn.addEventListener('click', (e: any) => {
      let userSelect = e.currentTarget.dataset.id;
      console.log(userSelect);
      let menuDisplay = menu.filter(item => {
        if (item.category === userSelect) {
          return item;
        }
      });
      if (userSelect === 'all') {
        display(menu);
      } else {
        display(menuDisplay);
      }
    });
  });
}
