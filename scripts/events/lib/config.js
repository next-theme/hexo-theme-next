'use strict';

const merge = require('hexo-util').deepMerge || require('lodash/merge');

module.exports = hexo => {
  let data = hexo.locals.get('data');

  /**
   * Merge configs from _data/next.yml into hexo.theme.config.
   * If next.yml not exists, merge all `theme_config.*` into hexo.theme.config.
   */
  if (data.next) {
    hexo.config = merge(hexo.config, data.next);
    hexo.theme.config = merge(hexo.theme.config, data.next);
  } else if (hexo.config.theme_config) {
    hexo.theme.config = merge(hexo.theme.config, hexo.config.theme_config);
  }

  if (hexo.theme.config.cache && hexo.theme.config.cache.enable && hexo.config.relative_link) {
    hexo.log.warn('Since caching is turned on, the `relative_link` option in Hexo `_config.yml` is set to `false` to avoid potential hazards.');
    hexo.config.relative_link = false;
  }
  hexo.config.meta_generator = false;

  // Custom languages support. Introduced in NexT v6.3.0.
  if (data.languages) {
    let { language } = hexo.config;
    let { i18n } = hexo.theme;

    const mergeLang = lang => {
      if (data.languages[lang]) i18n.set(lang, merge(i18n.get([lang]), data.languages[lang]));
    };

    if (Array.isArray(language)) {
      for (let lang of language) {
        mergeLang(lang);
      }
    } else {
      mergeLang(language);
    }
  }
};
