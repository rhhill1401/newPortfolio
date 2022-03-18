import people from './data.js';
import eSelector from './functions/selector.js';
//Todo step 1 create query selectors to select the container and both bottons
const container = eSelector('.slider-container');
const prevBtn = eSelector('.prev-btn');
const nextBtn = eSelector('.next-btn');
//* set slides

container.innerHTML = people
  .map((slider, sliderIndex) => {
    // console.table(slider);
    // console.table(sliderIndex);
    const { img, name, job, text } = slider;
    //* more logic later

    let position = 'next';
    if (sliderIndex === 0) {
      position = 'active';
    }
    if (sliderIndex === people.length - 1) {
      position = 'last';
    }
    return `  <article class="slide ${position}">
  <img src=${img}
    alt="Peter" class="img">
  <h4>${name}</h4>
  <p class="title">${job}</p>
  <p class="text">${text}</p>
  <div class="quote-icon">
    <div class="fas fa-quote-right"></div>
  </div>
</article>`;
  })
  .join('');

const startSlider = test => {
  const active = eSelector('.active');
  const last = eSelector('.last');
  let next = active.nextElementSibling;
  if (!next) {
    next = container.firstElementChild;
  }
  active.classList.remove(['active']);
  last.classList.remove(['last']);
  next.classList.remove(['next']);

  if (test === 'prev') {
    active.classList.add('next');
    last.classList.add('active');
    next = last.previousElementSibling;

    if (!next) {
      next = container.lastElementChild;
    }
    next.classList.add('last');
    return;
  }
  next.classList.remove(['next']);

  active.classList.add('last');
  last.classList.add('next');
  next.classList.add('active');
};

nextBtn.addEventListener('click', () => {
  startSlider();
});

prevBtn.addEventListener('click', () => {
  startSlider('prev');
});
