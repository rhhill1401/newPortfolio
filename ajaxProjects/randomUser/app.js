import getUser from './functions/fetchUser.js';
import displayUser from './functions/displayUser.js';
import selector from './functions/elementcheck.js';

const btn = selector('.btn');
//@ turns nodelist into an array to grant access to ALL array methods

//TODO #1 create callBack function
const showUser = async () => {
  //* get user from api and returns a object
  const person = await getUser();

  //* display user
  displayUser(person);
};

//TODO #2 create addEventListener for callBack function
//@ display user on refresh and on button click
window.addEventListener('DOMContentLoaded', showUser);
btn.addEventListener('click', showUser);
