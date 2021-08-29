/* global hexo */

'use strict';

const internalScripts = [];

hexo.theme.addProcessor('js/*', file => {
  internalScripts.push(file.params[0]);
});

hexo.extend.filter.register('after_generate', () => {
  const theme = hexo.theme.config;
  if (!theme.minify) return;

  if (theme.vendors.internal !== 'local') {
    // Remove all internal scripts
    internalScripts.forEach(path => {
      hexo.route.remove(path);
    });
    return;
  }

  if (!hexo.locals.get('pages').some(page => page.type === 'schedule')) {
    hexo.route.remove('js/schedule.js');
  }

  if (!theme.bookmark.enable) {
    hexo.route.remove('js/bookmark.js');
  }

  if (!theme.motion.enable) {
    hexo.route.remove('js/motion.js');
  }

  if (!theme.pjax) {
    hexo.route.remove('js/pjax.js');
  }

  if (theme.comments.style !== 'buttons') {
    hexo.route.remove('js/comments-buttons.js');
  }

  if (theme.scheme === 'Pisces' || theme.scheme === 'Gemini') {
    hexo.route.remove('js/schemes/muse.js');
  }

  // Third Party Scripts
  // Analytics
  if (!theme.baidu_analytics) {
    hexo.route.remove('js/third-party/analytics/baidu-analytics.js');
  }

  if (!theme.google_analytics.tracking_id) {
    hexo.route.remove('js/third-party/analytics/google-analytics.js');
  }

  if (!theme.growingio_analytics) {
    hexo.route.remove('js/third-party/analytics/growingio.js');
  }

  // Chat
  if (!theme.chatra.enable) {
    hexo.route.remove('js/third-party/chat/chatra.js');
  }

  if (!theme.gitter.enable) {
    hexo.route.remove('js/third-party/chat/gitter.js');
  }

  // Comments
  if (!theme.changyan.enable || !theme.changyan.appid || !theme.changyan.appkey) {
    hexo.route.remove('js/third-party/comments/changyan.js');
  }

  if (!theme.disqus.enable || !theme.disqus.shortname) {
    hexo.route.remove('js/third-party/comments/disqus.js');
  }

  if (!theme.disqusjs.enable || !theme.disqusjs.shortname || !theme.disqusjs.apikey) {
    hexo.route.remove('js/third-party/comments/disqusjs.js');
  }

  if (!theme.gitalk.enable) {
    hexo.route.remove('js/third-party/comments/gitalk.js');
  }

  if (!theme.isso) {
    hexo.route.remove('js/third-party/comments/isso.js');
  }

  if (!theme.livere_uid) {
    hexo.route.remove('js/third-party/comments/livere.js');
  }

  if (!theme.utterances.enable || !theme.utterances.repo) {
    hexo.route.remove('js/third-party/comments/utterances.js');
  }

  // Math
  if (!theme.math.katex.enable || !theme.math.katex.copy_tex) {
    hexo.route.remove('js/third-party/math/katex.js');
  }

  if (!theme.math.mathjax.enable) {
    hexo.route.remove('js/third-party/math/mathjax.js');
  }

  // Search
  if (!theme.algolia_search.enable) {
    hexo.route.remove('js/third-party/search/algolia-search.js');
  }

  if (!theme.local_search.enable) {
    hexo.route.remove('js/third-party/search/local-search.js');
  }

  // Statistics
  if (!theme.firestore.enable) {
    hexo.route.remove('js/third-party/statistics/firestore.js');
  }

  if (!theme.leancloud_visitors.enable) {
    hexo.route.remove('js/third-party/statistics/lean-analytics.js');
  }

  // Tags
  if (!theme.mermaid.enable) {
    hexo.route.remove('js/third-party/tags/mermaid.js');
  }

  if (!theme.pdf.enable) {
    hexo.route.remove('js/third-party/tags/pdf.js');
  }

  // Others
  if (!theme.fancybox) {
    hexo.route.remove('js/third-party/fancybox.js');
  }

  if (!theme.nprogress.enable) {
    hexo.route.remove('js/third-party/nprogress.js');
  }

  if (!theme.quicklink.enable) {
    hexo.route.remove('js/third-party/quicklink.js');
  }

  if (!theme.rating.enable) {
    hexo.route.remove('js/third-party/rating.js');
  }
});
