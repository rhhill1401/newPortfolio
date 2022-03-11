console.log('ajax');

//@ test url then store in a variable
const url = 'https://icanhazdadjoke.com/ss';

//@ create function to check for correct element selected
const elementSelector = selection => {
  let selector = document.querySelector(selection);
  if (selector) {
    return selector;
  }
  throw new Error(
    `You have entered an incorrect ${selection} check element/class!`
  );
};

//@ select button and text and store in a variable
const btn = elementSelector('.btn');
const text = elementSelector('.result');

//@ create a function for async request
const jokes = async () => {
  elementSelector('.result').innerHTML = 'Loading.....';
  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json', 'User-Agent': 'test' },
    });
    if (!response.ok) {
      throw new Error('There is an issue with url');
    }
    const data = await response.json();

    text.innerHTML = data.joke;
  } catch (error) {
    console.log(error.message);
    text.textContent = 'there was an error....';
  }
};

jokes();

btn.addEventListener('click', () => {
  jokes();
});
