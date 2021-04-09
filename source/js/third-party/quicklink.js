/* global CONFIG, quicklink */

{
  let resetFn = null;

  const onRefresh = () => {
    if (resetFn) resetFn();
    if (!CONFIG.quicklink.enable) return;

    let ignoresArr = CONFIG.quicklink.ignores || [];
    if (typeof ignoresArr === 'string') {
      try {
        ignoresArr = JSON.parse(`[${ignoresArr}]`);
      } catch {
        // eslint-disable-next-line no-console
        console.error('Setting regex and function in config file is deprecated. Try setting `CONFIG.quicklink.ignores` in any script code.');
        // eslint-disable-next-line no-eval
        ignoresArr = eval(`[${ignoresArr}]`);
      }
    } else if (!Array.isArray(ignoresArr)) {
      ignoresArr = [ignoresArr];
    }

    resetFn = quicklink.listen({
      timeout : CONFIG.quicklink.timeout,
      priority: CONFIG.quicklink.priority,
      ignores : [
        uri => uri.includes('#'),
        uri => uri === CONFIG.quicklink.url,
        ...ignoresArr
      ]
    });
  };

  if (CONFIG.quicklink.delay) {
    window.addEventListener('load', onRefresh);
    document.addEventListener('pjax:success', onRefresh);
  } else {
    document.addEventListener('page:loaded', onRefresh);
  }
}
