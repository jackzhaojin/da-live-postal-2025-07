export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'stats-item';
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div, index) => {
      if (index === 0) div.className = 'stats-number';
      else div.className = 'stats-label';
    });
    ul.append(li);
  });
  ul.className = 'stats-list';
  block.replaceChildren(ul);
}