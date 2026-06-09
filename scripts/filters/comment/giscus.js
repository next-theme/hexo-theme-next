/* global hexo */

'use strict';

const path = require('path');

const REQUIRED_OPTIONS = ['repo', 'repo_id', 'category', 'category_id'];

// Add Giscus comment support.
hexo.extend.filter.register('theme_inject', injects => {
  const config = hexo.theme.config.giscus;
  if (!config.enable) return;

  const missingOptions = REQUIRED_OPTIONS.filter(option => !config[option]);
  if (missingOptions.length > 0) {
    hexo.log.warn(`giscus.${missingOptions.join(', giscus.')} can't be null.`);
    return;
  }

  injects.comment.raw('giscus', '<div class="comments giscus-container"></div>', {}, { cache: true });
  injects.bodyEnd.file('giscus', path.join(hexo.theme_dir, 'layout/_third-party/comments/giscus.njk'));
});
