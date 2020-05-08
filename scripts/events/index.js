/* global hexo */

'use strict';

hexo.on('generateBefore', () => {
  // Merge config.
  require('./lib/config')(hexo);
  // Add filter type `theme_inject`
  require('./lib/injects')(hexo);
  // Highlight
  require('./lib/highlight')(hexo);
});

hexo.on('exit', () => {
  if (!hexo.theme.config.reminder) return;
  const https = require('https');
  const path = require('path');
  const { version } = require(path.normalize('../../package.json'));
  https.get('https://registry.npmjs.org/hexo-theme-next/latest', {
    headers: {
      'User-Agent': 'Theme NexT Client'
    }
  }, res => {
    let result = '';
    res.on('data', data => {
      result += data;
    });
    res.on('end', () => {
      try {
        const latest = JSON.parse(result).version;
        if (latest !== version) {
          hexo.log.warn(`Your theme NexT is outdated. Current version: v${version}, latest version: v${latest}`);
          hexo.log.warn('Visit https://github.com/next-theme/hexo-theme-next/releases for more information.');
        } else {
          hexo.log.info('Congratulations! Your are using the latest version of theme NexT.');
        }
      } catch (err) {
        hexo.log.error('Failed to detect version info. Error message:');
        hexo.log.error(err);
      }
    });
  }).on('error', err => {
    hexo.log.error('Failed to detect version info. Error message:');
    hexo.log.error(err);
  });
});
