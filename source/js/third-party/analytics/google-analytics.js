/* global CONFIG, dataLayer, gtag */

if (!CONFIG.google_analytics.only_pageview) {
  if (CONFIG.hostname === location.hostname) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = () => {
      dataLayer.push(arguments);
    };

    document.addEventListener('page:loaded', () => {
      gtag('js', new Date());
      gtag('config', CONFIG.google_analytics.tracking_id);
    });
  }
} else {
  const sendPageView = () => {
    if (CONFIG.hostname !== location.hostname) return;
    const uid = localStorage.getItem('uid') || (Math.random() + '.' + Math.random());
    localStorage.setItem('uid', uid);
    navigator.sendBeacon('https://www.google-analytics.com/collect', new URLSearchParams({
      v  : 1,
      tid: CONFIG.google_analytics.tracking_id,
      cid: uid,
      t  : 'pageview',
      dp : encodeURIComponent(location.pathname)
    }));
  };
  document.addEventListener('pjax:complete', sendPageView);
  sendPageView();
}
