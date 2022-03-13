import selector from './functions/selector.js';

const url = 'https://course-api.com/javascript-store-products';

const images = selector('.products-center');

const fetchProducts = async () => {
  //@ add loading animation
  images.innerHTML = '<div class="loading"></div>';
  //@ create try with fetch request
  try {
    const response = await fetch(url);
    const data = response.json();
    return data;
    //@ create  error
  } catch (err) {
    images.innerHTML = '<p class="error">There was an error</p>';
  }
};

const displayProducts = list => {
  const productList = list
    .map(product => {
      const { id } = product;
      const { name: title, price } = product.fields;
      const { url: img } = product.fields.image[0];

      const formatPrice = price / 100;
      return ` 
        <a class="single-product" href="product.html?id=${id}&name=terry&city=jacksonville">
          <img src="${img}" class="single-product-img img" alt="${title}">
          <footer>
            <h5 class="name">${title}</h5>
            <span class="price">${formatPrice}</span>
          </footer>
        </a>
    `;
    })
    .join('');
  images.innerHTML = `
  <div class="products-container"> ${productList}
  </div>`;
};

const start = async () => {
  //@ inovke fetch products
  const data = await fetchProducts();

  //@ invoke displayProducts and map over array of JSON from data
  displayProducts(data);
};
start();
