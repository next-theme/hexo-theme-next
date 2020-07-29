'use strict';

const merge = require('hexo-util').deepMerge || require('lodash/merge');
let plugins;
try {
  plugins = require('@next-theme/plugins');
} catch (error) {
}

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

  const { cache, language_switcher } = hexo.theme.config;
  if (cache && cache.enable && language_switcher) {
    hexo.log.warn('Since language_switcher is turned on, the caching is disabled to avoid potential hazards.');
    cache.enable = false;
  }
  if (cache && cache.enable && hexo.config.relative_link) {
    hexo.log.warn('Since caching is turned on, the `relative_link` option in Hexo `_config.yml` is set to `false` to avoid potential hazards.');
    hexo.config.relative_link = false;
  }
  if (typeof plugins === 'function') {
    const { vendors, generator } = plugins();
    Object.keys(vendors).forEach(key => {
      hexo.theme.config.vendors[key] = hexo.theme.config.vendors[key] || vendors[key];
    });
    hexo.extend.generator.register('next_vendors', () => generator);
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
