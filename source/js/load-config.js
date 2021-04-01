if (!window.NexT) window.NexT = {};

if (!window.CONFIG) {
  window.CONFIG = JSON.parse(
    document.querySelector('meta[name="hexo-config"]').content || '{}'
  );
}

(() => {
  document.querySelectorAll('meta[name^="hexo-config-"]')
    .forEach(configMeta => {
      const key = configMeta.name.slice('hexo-config-'.length);
      window.CONFIG[key] = JSON.parse(configMeta.content || '{}');
    });
})();
