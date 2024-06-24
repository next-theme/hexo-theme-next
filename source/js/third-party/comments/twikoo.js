/* global NexT, CONFIG, Twikoo */

document.addEventListener('page:loaded', () => {
  if (!CONFIG.page.comments) return;

  NexT.utils.loadComments('#twikoo-comments')
    .then(() => NexT.utils.getScript(
      CONFIG.twikoo.jsUrl || 'https://cdn.jsdelivr.net/npm/twikoo/dist/twikoo.all.min.js',
      {condition: window.twikoo}
    ))
    .then(() => {
      window.twikoo.init(CONFIG.twikoo);
    });
});
