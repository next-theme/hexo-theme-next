/* global NexT, CONFIG, quicklink */

{
  const quicklinkListen = () => {
    quicklink.listen({
      timeout : CONFIG.quicklink.timeout,
      priority: CONFIG.quicklink.priority,
      ignores : [
        uri => uri.includes('#'),
        uri => uri === CONFIG.quicklink.url,
        // TODO: `quicklink.ignores` may includes functions that can not be parsed safely in JS runtime
        ...JSON.parse(`[${CONFIG.quicklink.ignores}]`)
      ]
    });
  };

  document.addEventListener('page:loaded', () => {
    if (!CONFIG.quicklink.enable) return;

    NexT.utils.getScriptPromise(CONFIG.quicklink.js)
      .then(() => {
        if (CONFIG.quicklink.delay) {
          window.addEventListener('load', quicklinkListen);
        } else {
          quicklinkListen();
        }
      });
  });
}
