/**
 * note.js | https://theme-next.js.org/docs/tag-plugins/note
 */

'use strict';

module.exports = /** @param {import('hexo')} ctx */ ctx => function(/** @type {string[]} */ args, /** @type {string} */ content) {
  const keywords = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'no-icon'];

  /** @type {string[]} */
  const className = [];
  for (let i = 0; i < 2; i++) {
    if (keywords.includes(args[0])) {
      className.push(args.shift());
    } else {
      break;
    }
  }

  content = ctx.render.renderSync({ text: content, engine: 'markdown' });
  if (args.length === 0) {
    return `<div class="note ${className.join(' ')}">${content}</div>`;
  }
  return `<details class="note ${className.join(' ')}"><summary>${ctx.render.renderSync({ text: args.join(' '), engine: 'markdown' })}</summary>
${content}
</details>`;
};
