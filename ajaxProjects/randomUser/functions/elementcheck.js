const eSelector = selection => {
  let selector = document.querySelector(selection);
  if (selector) {
    return selector;
  }
  throw new Error(`Check ${selection}, incorrect element/class selected!`);
};
export default eSelector;
