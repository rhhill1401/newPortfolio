function eSelector(selection) {
  const selector = document.querySelector(selection);
  if (selector) {
    return selector;
  }
  throw new Error(`Invalid element selected: ${selection}, check spelling`);
}
export default eSelector;
