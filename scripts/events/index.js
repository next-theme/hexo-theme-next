/* global hexo */

'use strict';

hexo.extend.filter.register('before_generate', () => {
  // Merge config
  require('./lib/config')(hexo);
  // Set vendors
  require('./lib/vendors')(hexo);
  // Add filter type `theme_inject`
  require('./lib/injects')(hexo);
  // Highlight
  require('./lib/highlight')(hexo);
  // Menu and sub menu
  require('./lib/navigation')(hexo);
}, 0);

hexo.on('ready', () => {
  if (!/^(g|s)/.test(hexo.env.cmd) || process.argv.includes('--next-disable-banner')) return;
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
