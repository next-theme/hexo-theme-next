/* global NexT, CONFIG, MathJax */

document.addEventListener('page:loaded', () => {
  if (!CONFIG.enableMath) return;

  if (typeof MathJax === 'undefined') {
    const output = {
      displayOverflow: CONFIG.mathjax.display_overflow
    };
    if (CONFIG.mathjax.font_path) {
      output.fontPath = CONFIG.mathjax.font_path;
    }
    window.MathJax = {
      tex: {
        inlineMath: { '[+]': [['$', '$']] },
        tags      : CONFIG.mathjax.tags
      },
      options: {
        renderActions: {
          insertedScript: [200, () => {
            document.querySelectorAll('mjx-container:not([display])').forEach(node => {
              const target = node.parentNode;
              if (target.nodeName.toLowerCase() === 'li') {
                target.parentNode.classList.add('has-jax');
              }
            });
          }, '', false]
        }
      },
      output
    };
    NexT.utils.getScript(CONFIG.mathjax.js, {
      attributes: {
        defer: true
      }
    });
  } else {
    MathJax.startup.document.state(0);
    MathJax.typesetClear();
    MathJax.texReset();
    MathJax.typesetPromise();
  }
});
