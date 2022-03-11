import { menu } from './array.js';

const elementSelector = selection => {
  let selector = document.querySelector(selection);
  if (selector) {
    return selector;
  }
  throw new Error(`Improper ${selection} entered, check spelling!`);
};

//@ display alll elements of the array on load
window.addEventListener('DOMContentLoaded', () => {
  displayAll(menu);
});

//@ filter over the all teh categories of the menu array and only return the unique ones
const categories = menu.reduce(
  (value, item) => {
    if (!value.includes(item.category)) {
      value.push(item.category);
    }
    return value;
  },
  ['all']
);

//@ map over all the unique categories and render buttons for each one
const buttons = categories
  .map(item => {
    return `<button class="filter-btn" type="button" data-id=${item}>${item}</button>`;
  })
  .join(' ');
elementSelector('.btn-container').innerHTML = buttons;

const fBtns = document.querySelectorAll('.filter-btn');

fBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    let btnTarget = e.currentTarget.dataset.id;
    let menuDisplay = menu.filter(items => {
      if (btnTarget === items.category) {
        return items;
      }
    });
    if (btnTarget === 'all') {
      displayAll(menu);
    } else {
      displayAll(menuDisplay);
    }
  });
});

function displayAll() {
  let display = menu
    .map(items => {
      return `<article class="menu-item">
    <img src=${items.img} class="photo" alt="menu-item">

    <div class="item-info">
      <header>
        <h4>${items.title}</h4>
        <h4 class="price">${items.price}</h4>
      </header>
      <p class="item-text">${items.desc}
      </p>
    </div>
  </article>`;
    })
    .join('');
  elementSelector('.section-center').innerHTML = display;
}

// function elementSelectorAll(selection) {
//     let selector = document.querySelectorAll(selection);
//     if (selector) {
//         return selector;
//     }
//     throw new Error(`You have entered an invalid ${selector}! please retry`);
// }
// function elementSelector(selection) {
//     let selector = document.querySelector(selection);
//     if (selector) {
//         return selector;
//     }
//     throw new Error(`You have entered an invalid ${selector}! please retry`);
// }
// window.addEventListener('DOMContentLoaded', () => {
//     displayAll(menu);
// });
// const categoryFilter = menu.reduce((value, items) => {
//     if (!value.includes(items.category)) {
//         value.push(items.category);
//     }
//     return value;
// }, ['all']);
// const buttons = categoryFilter
//     .map(btn => {
//     return `<button class="filter-btn" type="button" data-id="${btn}">${btn}</button>`;
// })
//     .join('');
// elementSelector('.btn-container').innerHTML = buttons;
// const fBtns = elementSelectorAll('.filter-btn');
// const btnDisplay = fBtns.forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//         let category = e.currentTarget.dataset.id;
//         let buttons = menu.filter(items => {
//             if (category === items.category) {
//                 console.log(items);
//                 return items;
//             }
//         });
//         if (category === 'all') {
//             displayAll(menu);
//         }
//         else {
//             displayAll(buttons);
//         }
//     });
// });
// function displayAll(param) {
//     let display = param
//         .map((items) => {
//         return `<article class="menu-item">
//   <img src="${items.img}" class="photo" alt="menu-item">
//   <div class="item-info">
//     <header>
//       <h4>${items.title}</h4>
//       <h4 class="price">${items.price}</h4>
//     </header>
//     <p class="item-text">${items.desc}
//     </p>
//   </div>
// </article>
//   `;
//     })
//         .join('');
//     elementSelector('.section-center').innerHTML = display;
// }
// //# sourceMappingURL=menu.js.map//
