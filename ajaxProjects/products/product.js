import selector from './functions/selector.js';

const productDOM = selector('.product');

const url = 'https://course-api.com/javascript-store-single-product';

const fetchProduct = async () => {
  productDOM.innerHTML = '<h4 class="product-loading">Loading...</h4>';
  try {
    //* console.log(window.location.search);

    //@ grab the query selector starting with id
    const params = new URLSearchParams(window.location.search);

    //@ grab the query param for the key id
    const id = params.get('id');

    //@ fetch just the query with the id
    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    productDOM.innerHTML =
      '<p class="error">There was a problem loading please try again later </p>';
  }
};
const displayProduct = singleP => {
  // company, colors, description, name: title, price, img
  const {
    name: title,
    price,
    company,
    description: desc,
    image,
    colors,
  } = singleP.fields;
  const { url: img } = image[0];
  document.title = title.toUpperCase();
  const formatPrice = price / 100;

  const displayColors = colors
    .map(color => {
      return ` <span class="product-color" style="background: ${color}"></span>`;
    })
    .join('');

  productDOM.innerHTML = ` <div class="product-wrapper">
  <img src=${img} class="img" alt="${title}">
  <div class="product-info">
    <h3>${title}</h3>
    <h5>
      ${company}
    </h5>
    <span>${formatPrice}</span>
    <div class="colors">
      ${displayColors}
    
    </div>
    <p>${desc}</p>
    <button class="btn">add to cart</button>
  </div>
</div>`;
};

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
