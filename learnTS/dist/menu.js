import { menu } from './array.js';
const sectionContainer = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');
window.addEventListener('DOMContentLoaded', () => {
    display(menu);
});
const btns = menu.reduce((value, item) => {
    if (!value.includes(item.category)) {
        value.push(item.category);
    }
    return value;
}, ['all']);
const fbtnsDisplay = btns
    .map(btn => {
    return `<button class="filter-btn" type="button" data-id="${btn}">${btn}</button>`;
})
    .join('');
btnContainer.innerHTML = fbtnsDisplay;
const Buttons = document.querySelectorAll('.filter-btn');
Buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let categories = e.currentTarget.dataset.id;
        let btnDisplay = menu.filter(items => {
            if (categories === items.category) {
                return items;
            }
        });
        if (categories === 'all') {
            display(menu);
        }
        else {
            display(btnDisplay);
        }
    });
});
function display(param = []) {
    let mDisplay = param
        .map((item) => {
        return `<article class="menu-item">
    <img src="${item.img}" class="photo" alt="menu-item">

    <div class="item-info">
      <header>
        <h4>${item.title}</h4>
        <h4 class="price">${item.price}</h4>
      </header>
      <p class="item-text">${item.desc}
      </p>
    </div>
  </article>`;
    })
        .join('');
    sectionContainer.innerHTML = mDisplay;
}
window.addEventListener('DOMContentLoaded', () => { });
//# sourceMappingURL=menu.js.map