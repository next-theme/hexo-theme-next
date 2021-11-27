/* global hexo */

'use strict';

const path = require('path');
const { iconText } = require('./common');

// Add comment
hexo.extend.filter.register('theme_inject', injects => {
  const config = hexo.theme.config.changyan;
  if (!config.enable || !config.appid || !config.appkey) return;

  injects.comment.raw('changyan', '<div class="comments" id="SOHUCS" sid="{{gitalk_md5(page.title)}}" </div>', {}, {});

  injects.bodyEnd.file('changyan', path.join(hexo.theme_dir, 'layout/_third-party/comments/changyan.njk'));

});

// Add post_meta
hexo.extend.filter.register('theme_inject', injects => {
  const config = hexo.theme.config.changyan;
  if (!config.enable || !config.appid || !config.appkey) return;

  injects.postMeta.raw('changyan', `
  {% if post.comments %}
  <span class="post-meta-item">
    ${iconText('far fa-comment', 'changyan')}
     <a title="{{ post.title }}" href="{{ url_for(post.path) }}#SOHUCS">
       <span id="sourceId::{{gitalk_md5(post.title)}}" class="cy_cmt_count"></span>
     </a>
  </span>
  {% endif %}
  `,
  {},
  {}
  );
});
