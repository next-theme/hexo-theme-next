'use strict';

const { deepMerge } = require('hexo-util');

module.exports = hexo => {
  const data = hexo.locals.get('data');

  if (data.next) {
    hexo.log.warn('`next.yml` is deprecated. Please use `_config.next.yml` instead.');
    hexo.log.warn('Documentation: https://theme-next.js.org/docs/getting-started/configuration.html');
  }

  const { cache, changyan, growingio_analytics, language_switcher, leancloud_visitors } = hexo.theme.config;
  const warning = function(...args) {
    hexo.log.warn(`Since ${args[0]} is turned on, the ${args[1]} is disabled to avoid potential hazards.`);
  };

  if (cache?.enable && language_switcher) {
    warning('language_switcher', 'caching');
    cache.enable = false;
  }
  if (cache?.enable && hexo.config.relative_link) {
    warning('caching', '`relative_link` option in Hexo `_config.yml`');
    hexo.config.relative_link = false;
  }
  if (changyan?.enable) {
    hexo.log.warn('changyan is deprecated. Please migrate to another comment system.');
  }
  if (growingio_analytics) {
    hexo.log.warn('growingio_analytics is deprecated. Please migrate to another analytics provider.');
  }
  if (leancloud_visitors?.enable) {
    hexo.log.warn('LeanCloud will stop public services on 2027-01-12. Please migrate your data as soon as possible.');
    hexo.log.warn('Announcement: https://docs.leancloud.app/sdk/announcements/sunset-announcement/');
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
