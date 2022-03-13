const eSelector = selection => {
  const selector = document.querySelector(selection);
  if (selector) {
    return selector;
  }
  throw new Error(
    `You have selected an incorrect ${selection}, check spelling!`
  );
};
export default eSelector;
