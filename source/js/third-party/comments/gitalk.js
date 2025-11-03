/* global NexT, CONFIG, Gitalk */

document.addEventListener('page:loaded', async () => {
  if (!CONFIG.page.comments) return;

  // Parse and replace body expressions
  const allowed = {
    title: document.title,
    url  : location.href,
    path : location.pathname,
    lang : navigator.language
  };

  const parsedBody = CONFIG.gitalk.body?.replace(/\$\{([^}]+)}/g, (_, keyRaw) => {
    const key = keyRaw.trim();
    if (!/^[A-Za-z0-9_]+$/.test(key)) return '';
    return String(allowed[key] ?? '');
  });

  await NexT.utils.loadComments('.gitalk-container');
  await NexT.utils.getScript(CONFIG.gitalk.js, {
    condition: window.Gitalk
  });
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
