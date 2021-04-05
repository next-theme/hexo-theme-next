/* global NexT, CONFIG */

document.addEventListener('page:loaded', () => {
  if (!CONFIG.page.comments) return;

  NexT.utils.loadCommentsPromise('.utterances-container')
    .then(() => NexT.utils.getScriptPromise('https://utteranc.es/client.js', {
      attributes: {
        async       : true,
        crossOrigin : 'anonymous',
        'repo'      : CONFIG.utterances.repo,
        'issue-term': CONFIG.utterances.issue_term,
        'theme'     : CONFIG.utterances.theme
      },
      parentNode: document.querySelector('.utterances-container')
    }));
});
