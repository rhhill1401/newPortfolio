const showPeople = people => {
  let newPeople = people
    .map(person => {
      console.log(person);
      const { name, job } = person;
      return `<p>${name} <strong>${job}</strong></p>`;
    })
    .join('');
  console.log(newPeople);
  return newPeople;
};

export default showPeople;
