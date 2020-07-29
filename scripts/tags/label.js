/**
 * label.js | https://theme-next.js.org/docs/tag-plugins/label
 */

'use strict';

module.exports = ctx => function(args) {
  args = args.join(' ').split('@');
  const classes = args[0] || 'default';
  const text    = args[1] || '';

  if (!text) ctx.log.warn('Label text must be defined!');

  return `<mark class="label ${classes.trim()}">${text}</mark>`;
};
