/// <reference path="../../config.js" />
/* global CONFIG */

(function() {
  const database = `projects/${CONFIG.firestore.projectId}/databases/(default)`;
  const documents = `${database}/documents`;
  const api = `https://firestore.googleapis.com/v1/${documents}`;

  /**
   * @param {string} path
   * @param {Parameters<typeof fetch>[1]} options
   */
  const fetchFirestore = async (path, options) => {
    const response = await fetch(`${api}${path}`, options);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Firestore request failed with status ${response.status}`);
    return response.json();
  };

  /**
   * @param {string} title
   */
  const documentName = title => `${documents}/${CONFIG.firestore.collection}/${title}`;

  /**
   * @param {{ integerValue?: string, doubleValue?: string } | undefined } value
   */
  const getValue = value => Number(value?.integerValue ?? value?.doubleValue ?? 0);

  /**
   * @param {string} title
   * @param {number} increaseCount
   */
  const getCount = async (title, increaseCount) => {
    if (increaseCount) {
      const data = await fetchFirestore(':commit', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          writes: [{
            transform: {
              document       : documentName(title),
              fieldTransforms: [{
                fieldPath: 'count',
                increment: {
                  integerValue: '1'
                }
              }]
            }
          }]
        })
      });
      return getValue(data.writeResults[0].transformResults[0]);
    }

    const collection = encodeURIComponent(CONFIG.firestore.collection);
    const document = await fetchFirestore(`/${collection}/${encodeURIComponent(title)}`);
    return getValue(document?.fields?.count);
  };

  /**
   * @param {string[]} titles
   */
  const getCounts = async titles => {
    if (titles.length === 0) return [];
    const data = await fetchFirestore(':batchGet', {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        documents: titles.map(documentName),
        mask     : {
          fieldPaths: ['count']
        }
      })
    });
    const counts = new Map(data.map(result => {
      const document = result.found;
      return [document?.name ?? result.missing, getValue(document?.fields?.count)];
    }));
    return titles.map(title => counts.get(documentName(title)) ?? 0);
  };

  document.addEventListener('page:loaded', async () => {
    try {
      if (CONFIG.page.isPost) {
        // Fix issue #118
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
        const title = document.querySelector('.post-title').textContent.trim();
        let increaseCount = CONFIG.hostname === location.hostname;
        if (localStorage.getItem(title)) {
          increaseCount = false;
        } else {
          // Mark as visited
          localStorage.setItem(title, true);
        }
        const count = await getCount(title, increaseCount);
        document.querySelector('.firestore-visitors-count').innerText = count;
      } else if (CONFIG.page.isHome) {
        const titles = [...document.querySelectorAll('.post-title')].map(element => element.textContent.trim());
        const counts = await getCounts(titles);
        const metas = document.querySelectorAll('.firestore-visitors-count');
        counts.forEach((val, idx) => {
          metas[idx].innerText = val;
        });
      }
    } catch (error) {
      console.warn('Failed to load Firestore visitor count:', error);
    }
  });
})();
