// select modal-btn, modal-overlay, close-btn

function elementSelector(selection) {
  let selector = document.querySelector(selection);
  if (selector) {
    return selector;
  }
  throw new Error(
    `Invalid element "${selection}" entered, please check element`
  );
}

elementSelector('.modal-btn').addEventListener('click', () => {
  let element = elementSelector('.modal-overlay');
  element.classList.add('open-modal');
});

elementSelector('.close-btn').addEventListener('click', () => {
  let element = elementSelector('.modal-overlay');
  element.classList.remove('open-modal');
  console.log(element);
});
