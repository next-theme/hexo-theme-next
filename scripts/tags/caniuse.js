/**
 * caniuse.js | https://theme-next.js.org/docs/tag-plugins/caniuse
 */

'use strict';

module.exports = ctx => function(args) {
  const [feature, periods = 'current'] = args.join('').split('@');

  if (!feature) {
    ctx.log.warn('Caniuse feature can NOT be empty.');
    return '';
  }

  return `<iframe data-feature="${feature}" src="https://caniuse.bitsofco.de/embed/index.html?feat=${feature}&periods=${periods}&accessible-colours=false" frameborder="0" width="100%" height="400px"></iframe>`;
};
