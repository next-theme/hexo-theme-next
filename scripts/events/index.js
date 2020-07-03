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

hexo.on('ready', () => {
  const { version } = require('../../package.json');
  hexo.log.info(`==================================
  ███╗   ██╗███████╗██╗  ██╗████████╗
  ████╗  ██║██╔════╝╚██╗██╔╝╚══██╔══╝
  ██╔██╗ ██║█████╗   ╚███╔╝    ██║
  ██║╚██╗██║██╔══╝   ██╔██╗    ██║
  ██║ ╚████║███████╗██╔╝ ██╗   ██║
  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝   ╚═╝
========================================
NexT version ${version}
Documentation: https://theme-next.js.org
========================================`);
});
