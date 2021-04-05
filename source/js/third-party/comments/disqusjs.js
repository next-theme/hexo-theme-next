/* global NexT, CONFIG, DisqusJS */

document.addEventListener('page:loaded', () => {
  if (!CONFIG.page.comments) return;

  NexT.utils.loadCommentsPromise('#disqus_thread')
    .then(() => NexT.utils.getScriptPromise(CONFIG.disqusjs.js, { condition: window.DisqusJS }))
    .then(() => {
      window.dsqjs = new DisqusJS({
        api       : CONFIG.disqusjs.api || 'https://disqus.com/api/',
        apikey    : CONFIG.disqusjs.apikey,
        shortname : CONFIG.disqusjs.shortname,
        url       : CONFIG.page.permalink,
        identifier: CONFIG.page.path,
        title     : CONFIG.page.title
      });
    });
});
