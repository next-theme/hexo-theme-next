/**
 * button.js | https://theme-next.js.org/docs/tag-plugins/button
 */

/* global hexo */

'use strict';

function postButton(args) {
  args = args.join(' ').split(',');
  const url   = args[0];
  const text  = (args[1] || '').trim();
  let icon    = (args[2] || '').trim();
  const title = (args[3] || '').trim();

  if (!url) {
    hexo.log.warn('URL can NOT be empty.');
  }
  if (icon.length > 0) {
    if (!icon.startsWith('fa')) icon = 'fa fa-' + icon;
    icon = `<i class="${icon}"></i>`;
  }

  return `<a class="btn" href="${url}"${title.length > 0 ? ` title="${title}"` : ''}>${icon}${text}</a>`;
}

hexo.extend.tag.register('button', postButton, {ends: false});
hexo.extend.tag.register('btn', postButton, {ends: false});
