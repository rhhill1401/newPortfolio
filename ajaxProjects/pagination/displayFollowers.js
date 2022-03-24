import selector from '../submenus/functions/selector.js';

const container = selector('.container');

const display = followers => {
  const newFollowers = followers
    .map(people => {
      const { avatar_url, login, html_url } = people;
      return `<article class="card">
      <img src="${avatar_url}" alt="${login}"/>
      <h4>${login}</h4>
      <a href="${html_url}" class="btn">view profile</a>
      </article>`;
    })
    .join(' ');
  container.innerHTML = newFollowers;
};

export default display;
