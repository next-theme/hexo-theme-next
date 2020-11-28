/* global hexo */

'use strict';

const path = require('path');

// Add comment
hexo.extend.filter.register('theme_inject', injects => {
  const theme = hexo.theme.config;
  if (!theme.isso) return;

  injects.comment.raw('isso', `
  <div class="comments">
    <div id="isso-thread"></div>
  </div>
  `, {}, { cache: true });

  injects.bodyEnd.file('isso', path.join(hexo.theme_dir, 'layout/_third-party/comments/isso.njk'));

});
