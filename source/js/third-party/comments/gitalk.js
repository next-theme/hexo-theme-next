/* global NexT, CONFIG, Gitalk */

document.addEventListener('page:loaded', () => {
  if (!CONFIG.page.comments) return;

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
        body               : processTemplate(CONFIG.gitalk.body)
      });
      gitalk.render(document.querySelector('.gitalk-container'));
    });
});

// 函数：自动替换模板字符串中的占位符
function processTemplate(template) {
  return template.replace(/\$\{([^}]+)\}/g, (_, expression) => {
    // 使用 new Function 来执行表达式，确保动态获取值
    try {
      return new Function('return ' + expression)(); // 执行 `${document.title}` 或 `${location.href}` 等表达式
    } catch (e) {
      console.error('Error evaluating template:', e);
      return ''; // 如果替换失败，返回空字符串
    }
  });
}
