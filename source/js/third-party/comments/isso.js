/* global NexT, CONFIG */

document.addEventListener('page:loaded', () => {
  if (!CONFIG.page.comments) return;

  NexT.utils.loadCommentsPromise('#isso-thread')
    .then(() => NexT.utils.getScriptPromise(`${CONFIG.isso}js/embed.min.js`, {
      attributes: {
        dataset: {
          isso: `${CONFIG.isso}`
        }
      },
      parentNode: document.querySelector('#isso-thread')
    }));
});
