'use strict';

const { deepMerge } = require('hexo-util');

module.exports = hexo => {
  const data = hexo.locals.get('data');

  if (data.next) {
    hexo.log.warn('`next.yml` is deprecated. Please upgrade to Hexo 5 or later and use `_config.next.yml` instead.');
    hexo.log.warn('Documentation: https://theme-next.js.org/docs/getting-started/configuration.html');
  }

  const { cache, language_switcher } = hexo.theme.config;
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

  // Custom languages support. Introduced in NexT v6.3.0.
  if (data.languages) {
    const { language } = hexo.config;
    const { i18n } = hexo.theme;

    const mergeLang = lang => {
      if (data.languages[lang]) i18n.set(lang, deepMerge(i18n.get([lang]), data.languages[lang]));
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
