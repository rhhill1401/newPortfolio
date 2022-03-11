import { menu } from './array.js';

function elementSelectorAll(selection: any) {
  let selector = document.querySelectorAll(selection);
  if (selector) {
    return selector;
  }
  throw new Error(`You have entered an invalid ${selector}! please retry`);
}

function elementSelector(selection: any) {
  let selector = document.querySelector(selection);
  if (selector) {
    return selector;
  }
  throw new Error(`You have entered an invalid ${selector}! please retry`);
}

window.addEventListener('DOMContentLoaded', () => {
  displayAll(menu);
});

const categoryFilter = menu.reduce(
  (value, items) => {
    if (!value.includes(items.category)) {
      value.push(items.category);
    }
    return value;
  },
  ['all']
);

const buttons = categoryFilter
  .map(btn => {
    return `<button class="filter-btn" type="button" data-id="${btn}">${btn}</button>`;
  })
  .join('');
elementSelector('.btn-container').innerHTML = buttons;

const fBtns = elementSelectorAll('.filter-btn');

const btnDisplay = fBtns.forEach((btn: any) => {
  btn.addEventListener('click', (e: any) => {
    let category = e.currentTarget.dataset.id;
    let buttons = menu.filter(items => {
      if (category === items.category) {
        console.log(items);
        return items;
      }
    });
    if (category === 'all') {
      displayAll(menu);
    } else {
      displayAll(buttons);
    }
  });
});

function displayAll(param: any) {
  let display = param
    .map(
      (items: { img: string; title: string; price: number; desc: string }) => {
        return `<article class="menu-item">
  <img src="${items.img}" class="photo" alt="menu-item">
  <div class="item-info">
    <header>
      <h4>${items.title}</h4>
      <h4 class="price">${items.price}</h4>
    </header>
    <p class="item-text">${items.desc}
    </p>
  </div>
</article>
  `;
      }
    )
    .join('');
  elementSelector('.section-center').innerHTML = display;
}

// const sectionContainer = checkElement('.section-center');
// const btnContainer = checkElement('.btn-container');

// window.addEventListener('DOMContentLoaded', () => {
//   display(menu);
// });

// const btnCategories = menu.reduce(
//   (value, item) => {
//     if (!value.includes(item.category)) {
//       value.push(item.category);
//     }

//     return value;
//   },
//   ['all']
// );

// const btnDisplay = btnCategories
//   .map(items => {
//     return `  <button class="filter-btn" type="button" data-id=${items}>${items}</button>`;
//   })
//   .join('');
// btnContainer.innerHTML = btnDisplay;

// const buttons = document.querySelectorAll('.filter-btn')!;

// buttons.forEach(btn => {
//   btn.addEventListener('click', (e: any) => {
//     let category = e.currentTarget.dataset.id;
//     let menuDisplay = menu.filter(items => {
//       if (category === items.category) {
//         return items;
//       }
//     });
//     if (category === 'all') {
//       display(menu);
//     } else {
//       display(menuDisplay);
//     }
//   });
// });

// function display(p: { map: Function }) {
//   let images = p
//     .map(
//       (item: { img: string; price: number; title: string; desc: string }) => {
//         return `<article class="menu-item">
//     <img src=${item.img} class="photo" alt="menu-item">

//     <div class="item-info">
//       <header>
//         <h4>${item.title}</h4>
//         <h4 class="price">${item.price}</h4>
//       </header>
//       <p class="item-text">${item.desc}
//       </p>
//     </div>
//   </article>`;
//       }
//     )
//     .join('');
//   sectionContainer.innerHTML = images;
// }
// function checkElement(selection: any) {
//   const selector = document.querySelector(selection);
//   if (selector) {
//     return selector;
//   } else {
//     throw new Error(`Wrong element selected ${selection}, check your element`);
//   }
// }

// const sectionContainer = getElement('.section-center')!;
// const btnContainer = getElement('.btn-container')!;

// window.addEventListener('DOMContentLoaded', () => {
//   display(menu);
// });

// const btnCategories = menu.reduce(
//   (value, item) => {
//     if (!value.includes(item.category)) {
//       value.push(item.category);
//     }
//     return value;
//   },
//   ['all']
// );

// const menuBtns = btnCategories
//   .map(btn => {
//     return ` <button class="filter-btn" type="button" data-id=${btn}>${btn}</button>`;
//   })
//   .join('');
// btnContainer.innerHTML = menuBtns;

// let filterBtn = getElementAll('.filter-btn');

// filterBtn.forEach(btn => {
//   btn.addEventListener('click', (e: any) => {
//     let category = e.currentTarget.dataset.id;
//     let menuDispay = menu.filter(item => {
//       if (category === item.category) {
//         return item;
//       }
//     });
//     if (category === 'all') {
//       display(menu);
//     } else {
//       display(menuDispay);
//     }
//   });
// });

// function display(param: any): void {
//   let display = param
//     .map(
//       (item: { img: string; desc: string; title: string; price: number }) => {
//         return `<article class="menu-item">
//   <img src="${item.img}" class="photo" alt="menu-item">

//   <div class="item-info">
//     <header>
//       <h4>${item.title}</h4>
//       <h4 class="price">${item.price}</h4>
//     </header>
//     <p class="item-text">${item.desc}
//     </p>
//   </div>
// </article>`;
//       }
//     )
//     .join('');
//   sectionContainer.innerHTML = display;
// }

// function getElementAll(section: string) {
//   let btns = document.querySelectorAll(section);
//   if (btns) {
//     return btns;
//   }
//   throw new Error(
//     `Error you have typed an incorrect selector of ${section}  please try again!`
//   );
// }

// function getElement(section: string) {
//   let selector = document.querySelector(section);

//   if (selector) {
//     return selector;
//   }
//   throw new Error(
//     `Error you have typed an incorrect selector of ${section}  please try again!`
//   );
