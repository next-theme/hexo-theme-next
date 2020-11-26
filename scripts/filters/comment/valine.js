/* global hexo */

'use strict';

const path = require('path');
const { iconText } = require('./common');

// Add comment
hexo.extend.filter.register('theme_inject', injects => {
  const theme = hexo.theme.config;
  if (!theme.valine || !theme.valine.enable || !theme.valine.appId || !theme.valine.appKey) return;

  injects.comment.raw('valine', '<div class="comments" id="valine-comments"></div>', {}, {cache: true});

  injects.bodyEnd.file('valine', path.join(hexo.theme_dir, 'layout/_third-party/comments/valine.njk'));

});

// Add post_meta
hexo.extend.filter.register('theme_inject', injects => {
  const theme = hexo.theme.config;
  if (!theme.valine || !theme.valine.enable || !theme.valine.appId || !theme.valine.appKey) return;

  injects.postMeta.raw('valine', `
  {% if post.comments and (is_post() or theme.valine.comment_count) %}
  <span class="post-meta-item">
    ${iconText('far fa-comment', 'valine')}
    <a title="valine" href="{{ url_for(post.path) }}#valine-comments" itemprop="discussionUrl">
      <span class="post-comments-count valine-comment-count" data-xid="{{ url_for(post.path) }}" itemprop="commentCount"></span>
    </a>
  </span>
  {% endif %}
  `, {}, {});

});
