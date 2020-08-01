/* global hexo */

'use strict';

const { parse } = require('url');

/**
 * Export theme config to js
 */
hexo.extend.helper.register('next_config', function() {
  const { config, theme, next_version } = this;
  const exportConfig = {
    hostname  : parse(config.url).hostname || config.url,
    root      : config.root,
    scheme    : theme.scheme,
    version   : next_version,
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
    prism     : config.prismjs.enable && !config.prismjs.preprocess
  };
  if (config.algolia && theme.algolia_search && theme.algolia_search.enable) {
    exportConfig.algolia = {
      appID    : config.algolia.applicationID || config.algolia.appId,
      apiKey   : config.algolia.apiKey,
      indexName: config.algolia.indexName,
      hits     : theme.algolia_search.hits,
      labels   : theme.algolia_search.labels
    };
  }
  if (config.search && theme.local_search && theme.local_search.enable) {
    exportConfig.path = config.search.path;
    exportConfig.localsearch = theme.local_search;
  }
  return `<script class="hexo-configurations">
    var NexT = window.NexT || {};
    var CONFIG = ${JSON.stringify(exportConfig)};
  </script>`;
});
