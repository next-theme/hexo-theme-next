/* global NexT, CONFIG */

document.addEventListener('page:loaded', async () => {
  if (!CONFIG.page.comments) return;

  const giscusConfig = CONFIG.giscus;
  const container = document.querySelector('.giscus-container');
  if (!container || !giscusConfig) return;

  await NexT.utils.loadComments('.giscus-container');
  await NexT.utils.getScript('https://giscus.app/client.js', {
    attributes: {
      async                   : true,
      crossOrigin             : giscusConfig.crossorigin || 'anonymous',
      'data-repo'             : giscusConfig.repo,
      'data-repo-id'          : giscusConfig.repo_id,
      'data-category'         : giscusConfig.category,
      'data-category-id'      : giscusConfig.category_id,
      'data-mapping'          : giscusConfig.mapping || 'pathname',
      'data-strict'           : String(giscusConfig.strict ?? 0),
      'data-reactions-enabled': String(giscusConfig.reactions_enabled ?? 1),
      'data-emit-metadata'    : String(giscusConfig.emit_metadata ?? 0),
      'data-input-position'   : giscusConfig.input_position || 'top',
      'data-theme'            : giscusConfig.theme || 'preferred_color_scheme',
      'data-lang'             : giscusConfig.lang || 'zh-CN',
      'data-loading'          : giscusConfig.loading || 'lazy'
    },
    parentNode: container
  });
});
