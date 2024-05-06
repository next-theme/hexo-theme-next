/* global CONFIG, pjax, algoliasearch */

document.addEventListener('DOMContentLoaded', () => {
  const { indexName, appID, apiKey, hits } = CONFIG.algolia;
  const client = algoliasearch(appID, apiKey);
  const index = client.initIndex(indexName);

  const input = document.querySelector('.search-input');

  const formatHits = data => {
    const { title, excerpt, excerptStrip, contentStripTruncate } = data._highlightResult;
    let result = `<li><a href="${data.permalink}" class="search-result-title">${title.value}</a>`;
    const content = excerpt || excerptStrip || contentStripTruncate;
    if (content && content.value) {
      const div = document.createElement('div');
      div.innerHTML = content.value;
      result += `<a href="${data.permalink}"><p class="search-result">${div.textContent.substring(0, 100)}...</p></a></li>`;
    }
    return result;
  };

  const inputEventFunction = async() => {
    const searchText = input.value.trim();
    const container = document.querySelector('.search-result-container');
    if (searchText === '') {
      container.classList.add('no-result');
      container.innerHTML = '<div class="search-result-icon"><i class="fab fa-algolia fa-5x"></i></div>';
      return;
    }
    const data = await index.search(searchText, {
      attributesToRetrieve : ['permalink'],
      attributesToHighlight: ['title', 'excerpt', 'excerptStrip', 'contentStripTruncate'],
      page                 : 0,
      hitsPerPage          : hits.per_page || 10
    });
    if (data.nbHits === 0) {
      container.classList.add('no-result');
      container.innerHTML = '<div class="search-result-icon"><i class="far fa-frown fa-5x"></i></div>';
    } else {
      const stats = CONFIG.i18n.hits_time
        .replace('${hits}', data.nbHits)
        .replace('${time}', data.processingTimeMS);

      container.classList.remove('no-result');
      container.innerHTML = `<div class="search-stats">
          <span>${stats}</span>
          <img src="${CONFIG.images}/logo-algolia-nebula-blue-full.svg" alt="Algolia">
        </div>
        <hr>
        <ul class="search-result-list">${data.hits.map(formatHits).join('')}</ul>`;
      if (typeof pjax === 'object') pjax.refresh(container);
    }
  };

  if (CONFIG.algolia.trigger === 'auto') {
    input.addEventListener('input', inputEventFunction);
  } else {
    document.querySelector('.search-icon').addEventListener('click', inputEventFunction);
    input.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
        inputEventFunction();
      }
    });
  }

  // Handle and trigger popup window
  document.querySelectorAll('.popup-trigger').forEach(element => {
    element.addEventListener('click', () => {
      document.body.classList.add('search-active');
      // Wait for search-popup animation to complete
      setTimeout(() => input.focus(), 500);
    });
  });

  // Monitor main search box
  const onPopupClose = () => {
    document.body.classList.remove('search-active');
  };

  document.querySelector('.search-pop-overlay').addEventListener('click', event => {
    if (event.target === document.querySelector('.search-pop-overlay')) {
      onPopupClose();
    }
  });
  document.querySelector('.popup-btn-close').addEventListener('click', onPopupClose);
  document.addEventListener('pjax:success', onPopupClose);
  window.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      onPopupClose();
    }
  });
});
