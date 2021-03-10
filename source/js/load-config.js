if (!window.NexT) window.NexT = {};

if (!window.CONFIG) {
  window.CONFIG = JSON.parse(
    document.querySelector('meta[name="hexo-config"]')
      .getAttribute('content')
  );
}

window.CONFIG.page = JSON.parse(
  document.querySelector('meta[name="hexo-config-page"]')
    .getAttribute('content')
);
