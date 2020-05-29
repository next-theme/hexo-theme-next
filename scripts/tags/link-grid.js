/**
 * link-grid.js | https://theme-next.js.org/docs/tag-plugins/link-grid
 */

/* global hexo */

'use strict';

function linkGrid(args, content) {
  const image     = args[0] || '/images/avatar.gif';
  const delimiter = args[1] || '|';
  const comment   = args[2] || '%';

  const links = content.split('\n').map(item => {
    item = item.split(delimiter).map(arg => arg.trim());
    if (item[0][0] === comment) return '';
    return `<div class="link-grid-container">
<div class="link-grid-image" style="background-image: url(${item[3] || image});"></div>
<p>${item[0]}</p><p>${item[2] || item[1]}</p>
<a href="${item[1]}"></a>
</div>`;
  });
  return `<div class="link-grid">${links.join('')}</div>`;
}

hexo.extend.tag.register('linkgrid', linkGrid, {ends: true});
hexo.extend.tag.register('lg', linkGrid, {ends: true});
