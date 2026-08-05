/// <reference path="../../utils.js" />
/* global CONFIG, NexT, pjax */

document.addEventListener('DOMContentLoaded', () => {

  /** @type {typeof CONFIG.algolia & object} */
  const { indexName, appID, apiKey, hits } = CONFIG.algolia;
  const client = window['algoliasearch/lite'].liteClient(appID, apiKey);

  const input = document.querySelector('.search-input');
  const container = document.querySelector('.search-result-container');

  const formatHits = data => {
    const { title, excerpt, excerptStrip, contentStripTruncate } = data._highlightResult;
    let result = `<li><a href="${data.permalink}" class="search-result-title">${title.value}</a>`;
    const content = excerpt?.value || excerptStrip?.value || contentStripTruncate?.value;
    if (content) {
      const div = document.createElement('div');
      div.innerHTML = content;
      result += `<a href="${data.permalink}"><p class="search-result">${div.textContent.substring(0, 100)}...</p></a></li>`;
    }
    return result;
  };

  let latestSearchId = 0;

  /**
   * @param {string} searchText
   * @param {number} page
   * @param {number} searchId
   */
  const searchAlgolia = async (searchText, page, searchId) => {
    if (searchId !== latestSearchId) return;
    container.setAttribute('aria-busy', 'true');
    const startTime = Date.now();
    try {
      const result = await client.search({
        requests: [{
          indexName,
          page,
          query                : searchText,
          hitsPerPage          : hits.per_page || 10,
          attributesToRetrieve : ['permalink'],
          attributesToHighlight: ['title', 'excerpt', 'excerptStrip', 'contentStripTruncate'],
          highlightPreTag      : '<mark class="search-keyword">',
          highlightPostTag     : '</mark>'
        }]
      });
      if (searchId !== latestSearchId) return;

      const data = result.results[0];
      if (data.nbHits === 0) {
        container.innerHTML = '<div class="search-result-icon"><i class="far fa-frown fa-5x"></i></div>';
      } else {
        const stats = CONFIG.i18n.hits_time
          .replace('${hits}', data.nbHits)
          .replace('${time}', Date.now() - startTime);
        let pagination = '';
        if (data.nbPages > 1) {
          pagination += '<nav class="pagination algolia-pagination">';
          for (let i = 0; i < data.nbPages; i++) {
            if (i === page) {
              pagination += `<span class="page-number current">${i + 1}</span>`;
            } else {
              pagination += `<a class="page-number" href="#" data-index=${i}>${i + 1}</a>`;
            }
          }
          pagination += '</nav>';
        }

        container.innerHTML = `<div class="search-stats">
          <span>${stats}</span>
          <img src="${CONFIG.images}/logo-algolia-nebula-blue-full.svg" alt="Algolia">
        </div>
        <hr>
        <ul class="search-result-list">${data.hits.map(formatHits).join('')}</ul>
        ${pagination}`;
        if (typeof pjax === 'object') pjax.refresh(container);
        container.querySelectorAll('.page-number').forEach(element => {
          element.addEventListener('click', async event => {
            event.preventDefault();
            if (input.value.trim() !== searchText) return;
            const searchId = ++latestSearchId;
            await searchAlgolia(searchText, Number(element.dataset.index), searchId);
          });
        });
      }
    } catch (error) {
      if (searchId !== latestSearchId) return;
      console.warn('Algolia search failed:', error);
      container.innerHTML = '<div class="search-result-icon"><i class="far fa-frown fa-5x"></i></div>';
    } finally {
      if (searchId === latestSearchId) container.removeAttribute('aria-busy');
    }
  };

  /**
   * @param {number} searchId
   */
  const inputEventFunction = async searchId => {
    if (searchId !== latestSearchId) return;
    const searchText = input.value.trim();
    if (searchText === '') return;
    // Algolia client will automatically cache the data for same queries
    await searchAlgolia(searchText, 0, searchId);
  };

  const debouncedSearch = NexT.utils.debounce(inputEventFunction, 500);
  input.addEventListener('input', () => {
    const searchId = ++latestSearchId;
    if (input.value.trim() === '') {
      container.removeAttribute('aria-busy');
      container.innerHTML = '<div class="search-result-icon"><i class="fab fa-algolia fa-5x"></i></div>';
    } else {
      container.setAttribute('aria-busy', 'true');
    }
    debouncedSearch(searchId);
  });

  // Handle and trigger popup window
  document.querySelectorAll('.popup-trigger').forEach(element => {
    element.addEventListener('click', () => {
      NexT.utils.setGutter();
      document.body.classList.add('search-active');
      // Wait for search-popup animation to complete
      setTimeout(() => input.focus(), 500);
    });
  });

  // Monitor main search box
  const onPopupClose = () => {
    NexT.utils.setGutter('0');
    document.body.classList.remove('search-active');
  };

  document.querySelector('.search-pop-overlay').addEventListener('click', event => {
    if (event.target === document.querySelector('.search-pop-overlay')) {
      onPopupClose();
    }
  });
  document.querySelector('.popup-btn-close').addEventListener('click', onPopupClose);
  document.addEventListener('pjax:success', onPopupClose);
  window.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      NexT.utils.setGutter();
      document.body.classList.add('search-active');
      setTimeout(() => input.focus(), 500);
    }
  });
  window.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      onPopupClose();
    }
  });
});
