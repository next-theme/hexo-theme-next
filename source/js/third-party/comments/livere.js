/* global NexT, CONFIG, LivereTower */

document.addEventListener('page:loaded', () => {
  if (!CONFIG.page.comments) return;

  NexT.utils.loadCommentsPromise('#lv-container').then(() => {
    window.livereOptions = {
      refer: CONFIG.page.path.replace(/index\.html$/, '')
    };

    if (typeof LivereTower === 'function') return;

    NexT.utils.getScriptPromise('https://cdn-city.livere.com/js/embed.dist.js', {
      attributes: {
        async: true
      }
    });
  });
});
