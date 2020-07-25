/**
 * note.js | https://theme-next.js.org/docs/tag-plugins/note
 */

'use strict';

module.exports = ctx => function(args, content) {
  const keywords = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'no-icon'];
  const className = [];
  const summary = [];
  args.forEach((arg, index) => {
    if (index > 2 || !keywords.includes(arg)) {
      summary.push(arg);
    } else {
      className.push(arg);
    }
  });
  content = ctx.render.renderSync({ text: content, engine: 'markdown' });
  if (summary.length === 0) {
    return `<div class="note ${args.join(' ')}">${content}</div>`;
  }
  return `<details class="note ${className.join(' ')}"><summary>${ctx.render.renderSync({ text: summary.join(' '), engine: 'markdown' })}</summary>
${content}
</details>`;
};
