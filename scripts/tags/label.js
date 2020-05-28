/**
 * label.js | https://theme-next.js.org/docs/tag-plugins/label
 */

/* global hexo */

'use strict';

function postLabel(args) {
  args = args.join(' ').split('@');
  const classes = args[0] || 'default';
  const text    = args[1] || '';

  !text && hexo.log.warn('Label text must be defined!');

  return `<span class="label ${classes.trim()}">${text}</span>`;
}

hexo.extend.tag.register('label', postLabel, {ends: false});
