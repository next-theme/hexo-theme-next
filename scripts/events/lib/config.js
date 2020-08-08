'use strict';

const merge = require('hexo-util').deepMerge || require('lodash/merge');

module.exports = hexo => {
  const data = hexo.locals.get('data');

  if (data.next) {
    hexo.log.warn('`next.yml` is deprecated. Please upgrade to Hexo 5.0 and use `_config.next.yml` instead.');
    hexo.log.warn('Documentation: https://theme-next.js.org/docs/getting-started/configuration.html');
    hexo.config = merge(hexo.config, data.next);
    hexo.theme.config = merge(hexo.theme.config, data.next);
  } else if (hexo.config.theme_config) {
    hexo.theme.config = merge(hexo.theme.config, hexo.config.theme_config);
  }

  const { cache, language_switcher, leancloud_visitors, valine } = hexo.theme.config;
  const warning = function(...args) {
    hexo.log.warn(`Since ${args[0]} is turned on, the ${args[1]} is disabled to avoid potential hazards.`);
  };

  if (cache && cache.enable && language_switcher) {
    warning('language_switcher', 'caching');
    cache.enable = false;
  }
  if (cache && cache.enable && hexo.config.relative_link) {
    warning('caching', '`relative_link` option in Hexo `_config.yml`');
    hexo.config.relative_link = false;
  }
  if (leancloud_visitors && leancloud_visitors.enable && valine && valine.enable && valine.visitor) {
    warning('valine.visitor', 'leancloud_visitors');
    leancloud_visitors.enable = false;
  }
  hexo.config.meta_generator = false;

  // Custom languages support. Introduced in NexT v6.3.0.
  if (data.languages) {
    const { language } = hexo.config;
    const { i18n } = hexo.theme;

    const mergeLang = lang => {
      if (data.languages[lang]) i18n.set(lang, merge(i18n.get([lang]), data.languages[lang]));
    };

    if (Array.isArray(language)) {
      for (const lang of language) {
        mergeLang(lang);
      }
    } else {
      mergeLang(language);
    }
  }
};
