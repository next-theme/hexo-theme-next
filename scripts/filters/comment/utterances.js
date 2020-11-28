/* global hexo */

'use strict';

const path = require('path');

// Add comment
hexo.extend.filter.register('theme_inject', injects => {
  const config = hexo.theme.config.utterances;
  if (!config.enable) return;

  if (!config.repo) {
    hexo.log.warn('utterances.repo can\'t be null.');
    return;
  }

  injects.comment.raw('utterances', `
  <div class="comments">
    <div id="utterances-container"></div>
  </div>
  `, {}, { cache: true });

  injects.bodyEnd.file('utterances', path.join(hexo.theme_dir, 'layout/_third-party/comments/utterances.njk'));

});
