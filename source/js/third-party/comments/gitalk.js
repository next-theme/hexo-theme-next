/* global NexT, CONFIG, Gitalk */

document.addEventListener('page:loaded', () => {
  if (!CONFIG.page.comments) return;

  // Parse and replace body expressions
  const parsedBody = CONFIG.gitalk.body.replace(/\$\{([^}]+)}/g, (_, expression) => {
    try {
      return new Function('return ' + expression)(); // run `${document.title}` or `${location.href}` expressions
    } catch (e) {
      console.error('gitalk body expression parsing failed, expression is %s, error is %s', expression, e);
      return '';
    }
  })

  NexT.utils.loadComments('.gitalk-container')
    .then(() => NexT.utils.getScript(CONFIG.gitalk.js, {
      condition: window.Gitalk
    }))
    .then(() => {
      const gitalk = new Gitalk({
        clientID           : CONFIG.gitalk.client_id,
        clientSecret       : CONFIG.gitalk.client_secret,
        repo               : CONFIG.gitalk.repo,
        owner              : CONFIG.gitalk.github_id,
        admin              : [CONFIG.gitalk.admin_user],
        id                 : CONFIG.gitalk.path_md5,
        proxy              : CONFIG.gitalk.proxy,
        language           : CONFIG.gitalk.language || window.navigator.language,
        distractionFreeMode: CONFIG.gitalk.distraction_free_mode,
        body               : parsedBody
      });
      gitalk.render(document.querySelector('.gitalk-container'));
    });
});
