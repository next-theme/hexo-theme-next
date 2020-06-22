/* global hexo */

'use strict';

hexo.extend.helper.register('js_vendors', function() {
  let { config, theme } = this;
  let vendors = {
    anime: 'lib/anime.min.js'
  };
  if (config.prismjs.enable && !config.prismjs.preprocess) {
    vendors.prism = '//cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js';
    vendors.prism_autoloader = '//cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js';
    if (config.prismjs.line_number) {
      vendors.prism_line_numbers = '//cdn.jsdelivr.net/npm/prismjs@1/plugins/line-numbers/prism-line-numbers.min.js';
    }
  }
  if (theme.pjax) {
    vendors.pjax = '//cdn.jsdelivr.net/gh/next-theme/pjax@0/pjax.min.js';
  }
  if (theme.fancybox) {
    vendors.jquery = '//cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js';
    vendors.fancybox = '//cdn.jsdelivr.net/npm/@fancyapps/fancybox@3/dist/jquery.fancybox.min.js';
  }
  if (theme.mediumzoom) {
    vendors.mediumzoom = '//cdn.jsdelivr.net/npm/medium-zoom@1/dist/medium-zoom.min.js';
  }
  if (theme.lazyload) {
    vendors.lazyload = '//cdn.jsdelivr.net/npm/lozad@1/dist/lozad.min.js';
  }
  if (theme.pangu) {
    vendors.pangu = '//cdn.jsdelivr.net/npm/pangu@4/dist/browser/pangu.min.js';
  }
  if (theme.motion.enable) {
    vendors.velocity = 'lib/velocity/velocity.min.js';
    vendors.velocity_ui = 'lib/velocity/velocity.ui.min.js';
  }
  return vendors;
});
