/* global hexo */

'use strict';

hexo.extend.helper.register('js_vendors', function() {
  const { config, theme } = this;
  const vendors = { anime: {} };
  if (theme.prism.enable && !config.prismjs.preprocess) {
    vendors.prism = {};
    vendors.prism_autoloader = {};
    if (config.prismjs.line_number) {
      vendors.prism_line_numbers = {};
    }
  }
  if (theme.pjax) {
    vendors.pjax = { defer: true };
  }
  if (theme.fancybox) {
    vendors.fancybox_js = {};
  }
  if (theme.mediumzoom) {
    vendors.mediumzoom = {};
  }
  if (theme.lazyload) {
    vendors.lazyload = { defer: true };
  }
  if (theme.pangu) {
    vendors.pangu = {};
  }
  return vendors;
});
