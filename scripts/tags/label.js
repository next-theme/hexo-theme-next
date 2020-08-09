/**
 * label.js | https://theme-next.js.org/docs/tag-plugins/label
 */

'use strict';

module.exports = ctx => function(args) {
  const [classes = 'default', text = ''] = args.join(' ').split('@');

  if (!text) ctx.log.warn('Label text must be defined!');

  return `<mark class="label ${classes.trim()}">${text}</mark>`;
};
