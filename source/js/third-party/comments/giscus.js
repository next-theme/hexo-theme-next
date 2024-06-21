/* global NexT, CONFIG */

document.addEventListener('page:loaded', () => {
    if (!CONFIG.page.comments) return;
  
    NexT.utils.loadComments('.giscus-container')
      .then(() => NexT.utils.getScript('https://giscus.app/client.js', {
        attributes: {
          async                   : true,
          crossOrigin             : 'anonymous',
          'data-repo'             : CONFIG.giscus.repo,
          'data-repo-id'          : CONFIG.giscus.repo_id,
          'data-category'         : CONFIG.giscus.category,
          'data-category-id'      : CONFIG.giscus.category_id,
          'data-mapping'          : CONFIG.giscus.mapping,
          'data-strict'           : CONFIG.giscus.strict,
          'data-reactions-enabled': CONFIG.giscus.reactions_enabled,
          'data-emit-metadata'    : CONFIG.giscus.emit_metadata,
          'data-input-position'   : CONFIG.giscus.input_position,
          'data-theme'            : CONFIG.giscus.theme,
          'data-lang'             : CONFIG.giscus.lang,
          'data-loading'          : CONFIG.giscus.loading,
        },
        parentNode: document.querySelector('.giscus-container')
      }));
  });
