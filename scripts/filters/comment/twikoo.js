/* global hexo */

'use strict';

const path = require('path');

// Add comment
hexo.extend.filter.register('theme_inject', injects => {
  const theme = hexo.theme.config;

  if (!theme.twikoo.enable || !theme.twikoo.envId) return;

  injects.comment.raw('twikoo', '<div class="comments"><div id="twikoo-comments"></div></div>', {}, { cache: true });

  injects.bodyEnd.file('twikoo', path.join(hexo.theme_dir, 'layout/_third-party/comments/twikoo.njk'));

});

// Add post_meta
hexo.extend.filter.register('theme_inject', injects => {
  const theme = hexo.theme.config;
  if (!theme.twikoo.enable || !theme.twikoo.envId) return;

  if (theme.twikoo.visitor) {
    injects.postMeta.raw('twikoo', `
    <span id="{{ url_for(post.path) }}" class="post-meta-item twikoo_visitors" data-flag-title="{{ post.title }}" title="{{ __('post.views') }}">
      <span class="post-meta-item-icon">
        <i class="far fa-eye"></i>
      </span>
      <span class="post-meta-item-text">{{ __('post.views') + __('symbol.colon') }}</span>
      <span id="twikoo_visitors"></span>
    </span>
  `, {}, {});
  }

});
