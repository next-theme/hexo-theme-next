/**
 * link-grid.js | https://theme-next.js.org/docs/tag-plugins/link-grid
 */

'use strict';

module.exports = function([image = '/images/avatar.gif', delimiter = '|', comment = '%'], content) {
  const links = content.split('\n').filter(line => line.trim() !== '').map(line => {
    const item = line.split(delimiter).map(arg => arg.trim());
    if (item[0][0] === comment) return '';
    return `<div class="link-grid-container">
<img class="link-grid-image" alt="${item[0]}" src="${item[3] || image}">
<p>${item[0]}</p><p>${item[2] || item[1]}</p>
<a href="${item[1]}"></a>
</div>`;
  });
  return `<div class="link-grid">${links.join('')}</div>`;
};
