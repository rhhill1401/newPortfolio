const eSelector = selection => {
  let selector = document.querySelector(selection);
  if (selector) {
    return selector;
  }
  throw new Error('You have selected the wrong ${selection} check spelling');
};
export default eSelector;
