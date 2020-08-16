/**
 * mermaid.js | https://theme-next.js.org/docs/tag-plugins/mermaid
 */

'use strict';

const { escapeHTML } = require('hexo-util');

module.exports = function(args, content) {
  return `<div class="mermaid">
${args.join(' ')}
${escapeHTML(content)}
</div>`;
};
