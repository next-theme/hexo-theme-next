/**
 * center-quote.js | https://theme-next.js.org/docs/tag-plugins/
 */

'use strict';

module.exports = ctx => function(args, content) {
  return `<blockquote class="blockquote-center">
${ctx.render.renderSync({ text: content, engine: 'markdown' })}
</blockquote>`;
};
