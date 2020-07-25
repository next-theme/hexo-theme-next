/**
 * link-grid.js | https://theme-next.js.org/docs/tag-plugins/link-grid
 */

'use strict';

module.exports = function(args, content) {
  const image     = args[0] || '/images/avatar.gif';
  const delimiter = args[1] || '|';
  const comment   = args[2] || '%';

  const links = content.split('\n').filter(line => line.trim() !== '').map(line => {
    line = line.split(delimiter).map(arg => arg.trim());
    if (line[0][0] === comment) return '';
    return `<div class="link-grid-container">
<div class="link-grid-image" style="background-image: url(${line[3] || image});"></div>
<p>${line[0]}</p><p>${line[2] || line[1]}</p>
<a href="${line[1]}"></a>
</div>`;
  });
  return `<div class="link-grid">${links.join('')}</div>`;
};
