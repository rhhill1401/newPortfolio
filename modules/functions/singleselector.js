function eSelector(selection) {
  let selector = document.querySelector(selection);
  if (selector) {
    return selector;
  }
  throw new Error(
    `You have entered an incorrect ${selection}!, check spelling`
  );
}

export default eSelector;
