import showDrinks from './src/presentDrinks.js';
import './src/searchForm.js';
const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=z';

window.addEventListener('DOMContentLoaded', () => {
  showDrinks(URL);
});
