/* global hexo */

'use strict';

const path = require('path');

// Add comment
hexo.extend.filter.register('theme_inject', injects => {
  const theme = hexo.theme.config;
  if (!theme.waline.enable) return;

  injects.comment.raw('waline', '<div class="comments waline-container"><div id="waline"></div></div>', {}, { cache: true });

  injects.bodyEnd.file('waline', path.join(hexo.theme_dir, 'layout/_third-party/comments/waline.njk'));

});
