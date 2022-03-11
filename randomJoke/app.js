//@ 1 variable to store url
const URL = 'https://api.chucknorris.io/jokes/random';

const btn = eSelector('.btn');
const content = eSelector('.content');

btn.addEventListener('click', () => {
  getData(URL);
});

//@ 2 create function
function getData(url) {
  const xhr = new XMLHttpRequest();

  //@ 3 create get request
  xhr.open('GET', url);
  //@5coonditional method
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;
    if (xhr.status === 200) {
      const { value: joke } = JSON.parse(xhr.responseText);
      content.textContent = joke;
    } else {
      console.log({
        status: xhr.status,
        text: xhr.statusText,
      });
    }
  };
  //@4  send
  xhr.send();
}

function eSelector(selection) {
  let selector = document.querySelector(selection);
  if (selector) {
    return selector;
  }
  throw new Error(
    `You have entered an incorrect ${selection}!, check spelling`
  );
}

// let href =
//   'http%3A%2F%2Flocalhost%3A5162%2Fc%2Fskinmedica%3Frtm%3D%22account%2Frewards%2Falleconnectmodal%22';
// if (href.indexOf('rtm') != -1) {
//   let decodededURL = decodeURIComponent(href);
//   console.log(decodededURL);
//   let newURL = decodededURL.indexOf('rtm');
//   console.log(newURL);
//   let text = decodededURL;
//   let result = text.substring(newURL + 4);
//   console.log(result);
// }

const UrlDecoder = (url, param, num) => {
  //* checks if url contains a pramater
  if (url.indexOf(param) != -1) {
    let decodedURL = decodeURIComponent(url);
    console.log(decodedURL);
    let newURL = decodedURL.indexOf(param);
    console.log(param);

    let result = decodedURL.substring(newURL + num);
    console.log(result);
  }
};

UrlDecoder(
  'http%3A%2F%2Flocalhost%3A5162%2Fc%2Fskinmedica%3Frtm%3D%22account%2Frewards%2Falleconnectmodal%22',
  'rtm',
  4
);
