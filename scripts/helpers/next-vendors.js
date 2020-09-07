/* global hexo */

'use strict';

hexo.extend.helper.register('js_vendors', function() {
  const { config, theme } = this;
  const vendors = ['anime'];
  if (config.prismjs.enable && !config.prismjs.preprocess) {
    vendors.push('prism', 'prism_autoloader');
    if (config.prismjs.line_number) {
      vendors.push('prism_line_numbers');
    }
  }
  if (theme.pjax) {
    vendors.push('pjax');
  }
  if (theme.fancybox) {
    vendors.push('jquery', 'fancybox_js');
  }
  if (theme.mediumzoom) {
    vendors.push('mediumzoom');
  }
  if (theme.lazyload) {
    vendors.push('lazyload');
  }
  if (theme.pangu) {
    vendors.push('pangu');
  }
  return vendors;
});
