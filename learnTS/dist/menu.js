import { menu } from './array.js';
const sectionCenter = document.querySelector('.section-center');
const container = document.querySelector('.btn-container');
window.addEventListener('DOMContentLoaded', () => {
    display(menu);
    displayBtns();
});
function display(menu) {
    let display = menu.map((items) => {
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
function displayBtns() {
    const categories = menu.reduce((values, item) => {
        if (!values.includes(item.category)) {
            values.push(item.category);
        }
        return values;
    }, ['all']);
    const categoryBtns = categories
        .map(category => {
        return `<button class="filter-btn" 
      type="button"
       data-id="${category}">${category}</button>`;
    })
        .join('');
    container.innerHTML = categoryBtns;
    const fltbtn = document.querySelectorAll('.filter-btn');
    fltbtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let userSelect = e.currentTarget.dataset.id;
            console.log(userSelect);
            let menuDisplay = menu.filter(item => {
                if (item.category === userSelect) {
                    return item;
                }
            });
            if (userSelect === 'all') {
                display(menu);
            }
            else {
                display(menuDisplay);
            }
        });
    });
}
//# sourceMappingURL=menu.js.map