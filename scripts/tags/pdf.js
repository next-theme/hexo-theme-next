/**
 * pdf.js | https://theme-next.js.org/docs/tag-plugins/pdf
 */

'use strict';

module.exports = ctx => function(args) {
  const theme = ctx.theme.config;
  return `<div class="pdf-container" data-target="${args[0]}" data-height="${args[1] || theme.pdf.height}"></div>`;
};
