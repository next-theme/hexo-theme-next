/* global hexo */

'use strict';

const { parse } = require('url');

/**
 * Export theme config
 */
hexo.extend.helper.register('next_config', function() {
  const { config, theme, url_for, __ } = this;
  const exportConfig = {
    hostname  : parse(config.url).hostname || config.url,
    root      : config.root,
    images    : url_for(theme.images),
    scheme    : theme.scheme,
    version   : this.next_version,
    exturl    : theme.exturl,
    sidebar   : theme.sidebar,
    copycode  : theme.codeblock.copy_button.enable,
    bookmark  : theme.bookmark,
    fancybox  : theme.fancybox,
    mediumzoom: theme.mediumzoom,
    lazyload  : theme.lazyload,
    pangu     : theme.pangu,
    comments  : theme.comments,
    motion    : theme.motion,
    prism     : config.prismjs.enable && !config.prismjs.preprocess,
    i18n      : {
      placeholder: __('search.placeholder'),
      empty      : __('search.empty', '${query}'),
      hits_time  : __('search.hits_time', '${hits}', '${time}'),
      hits       : __('search.hits', '${hits}')
    }
  };
  if (config.algolia && theme.algolia_search && theme.algolia_search.enable) {
    exportConfig.algolia = {
      appID    : config.algolia.applicationID || config.algolia.appId,
      apiKey   : config.algolia.apiKey,
      indexName: config.algolia.indexName,
      hits     : theme.algolia_search.hits
    };
  }
  if (config.search && theme.local_search && theme.local_search.enable) {
    exportConfig.path = url_for(config.search.path);
    exportConfig.localsearch = theme.local_search;
  }
  return exportConfig;
});

hexo.extend.helper.register('next_config_unique', function() {
  const { page, is_home, is_post } = this;
  return {
    sidebar  : page.sidebar || '',
    isHome   : is_home(),
    isPost   : is_post(),
    lang     : page.lang,
    comments : page.comments || '',
    permalink: page.permalink || '',
    path     : page.path || '',
    title    : page.title || ''
  };
});
