const paginate = followers => {
  const itemsPerPage = 9;
  //@ round up by using Math.ceil
  const numberOfPages = Math.ceil(followers.length / itemsPerPage);
  console.log(numberOfPages);
  const newFollwers = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return followers.slice(start, start + itemsPerPage);
  });
  return newFollwers;
};

export default paginate;
