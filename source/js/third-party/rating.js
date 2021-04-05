/* global NexT, CONFIG, wpac_init */

document.addEventListener('page:loaded', () => {
  if (!CONFIG.page.isPost) return;
  if (!window.wpac_init) window.wpac_init = [];

  wpac_init.push({
    widget: 'Rating',
    id    : CONFIG.rating.id,
    el    : 'wpac-rating',
    color : CONFIG.rating.color
  });

  if (window.WIDGETPACK_LOADED) return;
  window.WIDGETPACK_LOADED = true;
  NexT.utils.getScriptPromise('//embed.widgetpack.com/widget.js', {
    attributes: {
      async: true
    }
  });
});
