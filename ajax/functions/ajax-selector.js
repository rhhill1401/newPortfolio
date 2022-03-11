function eSelector(selection) {
  let selector = document.querySelector(selection);
  if (selector) {
    return selector;
  }
  throw new Error(`You have entered an invalid ${selection}, please try again`);
}
export default eSelector;
