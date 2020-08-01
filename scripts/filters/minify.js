/* global hexo */

'use strict';

hexo.extend.filter.register('after_generate', () => {
  const theme = hexo.theme.config;
  if (!theme.minify) return;

  if (!theme.bookmark.enable) {
    hexo.route.remove('js/bookmark.js');
  }

  if (!theme.motion.enable) {
    hexo.route.remove('js/motion.js');
    hexo.route.remove('lib/animate-css/animate.min.css');
  } else if (theme.vendors.animate_css) {
    hexo.route.remove('lib/animate-css/animate.min.css');
  }

  if (theme.vendors.fontawesome) {
    const lists = hexo.route.list();
    lists.forEach(path => {
      if (path.startsWith('lib/font-awesome')) hexo.route.remove(path);
    });
  }

  if (theme.vendors.anime) {
    hexo.route.remove('lib/anime.min.js');
  }

  if (!theme.algolia_search.enable) {
    hexo.route.remove('js/algolia-search.js');
  }

  if (!theme.local_search.enable) {
    hexo.route.remove('js/local-search.js');
  }

  if (theme.scheme === 'Pisces' || theme.scheme === 'Gemini') {
    hexo.route.remove('js/schemes/muse.js');
  }
});
