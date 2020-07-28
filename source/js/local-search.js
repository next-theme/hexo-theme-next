/* global CONFIG */

document.addEventListener('DOMContentLoaded', () => {
  // Popup Window
  let isfetched = false;
  let datas;
  let isXml = true;
  // Search DB path
  let searchPath = CONFIG.path;
  if (searchPath.length === 0) {
    searchPath = 'search.xml';
  } else if (searchPath.endsWith('json')) {
    isXml = false;
  }
  const input = document.querySelector('.search-input');
  const resultContent = document.getElementById('search-result');

  const getIndexByWord = (word, text, caseSensitive) => {
    if (CONFIG.localsearch.unescape) {
      const div = document.createElement('div');
      div.innerText = word;
      word = div.innerHTML;
    }
    const wordLen = word.length;
    if (wordLen === 0) return [];
    let startPosition = 0;
    let position = [];
    const index = [];
    if (!caseSensitive) {
      text = text.toLowerCase();
      word = word.toLowerCase();
    }
    while ((position = text.indexOf(word, startPosition)) > -1) {
      index.push({ position, word });
      startPosition = position + wordLen;
    }
    return index;
  };

  // Merge hits into slices
  const mergeIntoSlice = (start, end, index, searchText) => {
    let item = index[index.length - 1];
    let { position, word } = item;
    const hits = [];
    let searchTextCountInSlice = 0;
    while (position + word.length <= end && index.length !== 0) {
      if (word === searchText) {
        searchTextCountInSlice++;
      }
      hits.push({
        position,
        length: word.length
      });
      const wordEnd = position + word.length;

      // Move to next position of hit
      index.pop();
      while (index.length !== 0) {
        item = index[index.length - 1];
        position = item.position;
        word = item.word;
        if (wordEnd > position) {
          index.pop();
        } else {
          break;
        }
      }
    }
    return {
      hits,
      start,
      end,
      searchTextCount: searchTextCountInSlice
    };
  };

  // Highlight title and content
  const highlightKeyword = (text, slice) => {
    let result = '';
    let prevEnd = slice.start;
    slice.hits.forEach(hit => {
      result += text.substring(prevEnd, hit.position);
      const end = hit.position + hit.length;
      result += `<mark class="search-keyword">${text.substring(hit.position, end)}</mark>`;
      prevEnd = end;
    });
    result += text.substring(prevEnd, slice.end);
    return result;
  };

  const getResultItems = (searchText, keywords) => {
    const resultItems = [];
    console.log(searchText)
    datas.forEach(({ title, content, url }) => {
      const titleInLowerCase = title.toLowerCase();
      const contentInLowerCase = content.toLowerCase();
      let indexOfTitle = [];
      let indexOfContent = [];
      let searchTextCount = 0;
      keywords.forEach(keyword => {
        indexOfTitle = indexOfTitle.concat(getIndexByWord(keyword, titleInLowerCase, false));
        indexOfContent = indexOfContent.concat(getIndexByWord(keyword, contentInLowerCase, false));
      });

      // Show search results
      if (indexOfTitle.length === 0 && indexOfContent.length === 0) return;
      const hitCount = indexOfTitle.length + indexOfContent.length;
      // Sort index by position of keyword
      [indexOfTitle, indexOfContent].forEach(index => {
        index.sort((left, right) => {
          if (right.position !== left.position) {
            return right.position - left.position;
          }
          return left.word.length - right.word.length;
        });
      });

      const slicesOfTitle = [];
      if (indexOfTitle.length !== 0) {
        const tmp = mergeIntoSlice(0, title.length, indexOfTitle, searchText);
        searchTextCount += tmp.searchTextCountInSlice;
        slicesOfTitle.push(tmp);
      }

      let slicesOfContent = [];
      while (indexOfContent.length !== 0) {
        const item = indexOfContent[indexOfContent.length - 1];
        const { position, word } = item;
        // Cut out 100 characters
        let start = position - 20;
        let end = position + 80;
        if (start < 0) {
          start = 0;
        }
        if (end < position + word.length) {
          end = position + word.length;
        }
        if (end > content.length) {
          end = content.length;
        }
        const tmp = mergeIntoSlice(start, end, indexOfContent, searchText);
        searchTextCount += tmp.searchTextCountInSlice;
        slicesOfContent.push(tmp);
      }

      // Sort slices in content by search text's count and hits' count
      slicesOfContent.sort((left, right) => {
        if (left.searchTextCount !== right.searchTextCount) {
          return right.searchTextCount - left.searchTextCount;
        } else if (left.hits.length !== right.hits.length) {
          return right.hits.length - left.hits.length;
        }
        return left.start - right.start;
      });

      // Select top N slices in content
      const upperBound = parseInt(CONFIG.localsearch.top_n_per_article, 10);
      if (upperBound >= 0) {
        slicesOfContent = slicesOfContent.slice(0, upperBound);
      }

      let resultItem = '';

      if (slicesOfTitle.length !== 0) {
        resultItem += `<li><a href="${url}" class="search-result-title">${highlightKeyword(title, slicesOfTitle[0])}</a>`;
      } else {
        resultItem += `<li><a href="${url}" class="search-result-title">${title}</a>`;
      }

      slicesOfContent.forEach(slice => {
        resultItem += `<a href="${url}"><p class="search-result">${highlightKeyword(content, slice)}...</p></a>`;
      });

      resultItem += '</li>';
      resultItems.push({
        item: resultItem,
        id  : resultItems.length,
        hitCount,
        searchTextCount
      });
    });
    return resultItems;
  }

  const inputEventFunction = () => {
    if (!isfetched) return;
    const searchText = input.value.trim().toLowerCase();
    const keywords = searchText.split(/[-\s]+/);
    if (keywords.length > 1) {
      keywords.push(searchText);
    }
    let resultItems = [];
    if (searchText.length > 0) {
      // Perform local searching
      resultItems = getResultItems(searchText, keywords);
    }
    if (keywords.length === 1 && keywords[0] === '') {
      resultContent.innerHTML = '<div id="no-result"><i class="fa fa-search fa-5x"></i></div>';
    } else if (resultItems.length === 0) {
      resultContent.innerHTML = '<div id="no-result"><i class="far fa-frown fa-5x"></i></div>';
    } else {
      resultItems.sort((left, right) => {
        if (left.searchTextCount !== right.searchTextCount) {
          return right.searchTextCount - left.searchTextCount;
        } else if (left.hitCount !== right.hitCount) {
          return right.hitCount - left.hitCount;
        }
        return right.id - left.id;
      });
      resultContent.innerHTML = `<ul class="search-result-list">${resultItems.map(result => result.item).join('')}</ul>`;
      window.pjax && window.pjax.refresh(resultContent);
    }
  };

  const fetchData = () => {
    fetch(CONFIG.root + searchPath)
      .then(response => response.text())
      .then(res => {
        // Get the contents from search data
        isfetched = true;
        datas = isXml ? [...new DOMParser().parseFromString(res, 'text/xml').querySelectorAll('entry')].map(element => {
          return {
            title  : element.querySelector('title').textContent,
            content: element.querySelector('content').textContent,
            url    : element.querySelector('url').textContent
          };
        }) : JSON.parse(res);
        // Only match articles with non-empty titles
        datas = datas.filter(data => data.title).map(data => {
          data.title = data.title.trim();
          data.content = data.content ? data.content.trim().replace(/<[^>]+>/g, '') : '';
          data.url = decodeURIComponent(data.url).replace(/\/{2,}/g, '/');
          return data;
        });
        // Remove loading animation
        document.getElementById('no-result').innerHTML = '<i class="fa fa-search fa-5x"></i>';
        inputEventFunction();
      });
  };

  /**
   * small helper function to urldecode strings
   */
  const urldecode = x => {
    return decodeURIComponent(x).replace(/\+/g, ' ');
  };

  /**
   * This function returns the parsed url parameters of the
   * current request. Multiple values per key are supported,
   * it will always return arrays of strings for the value parts.
   */
  const getQueryParameters = () => {
    const parts = location.search.split('?')[1].split('&');
    const result = {};
    for (let part of parts) {
      let [key, value] = part.split('=', 2);
      key = urldecode(key);
      value = urldecode(value);
      if (key in result) {
        result[key].push(value);
      } else {
        result[key] = [value];
      }
    }
    return result;
  };

  /**
   * highlight a given string on a jquery object by wrapping it in
   * span elements with the given class name.
   */
  const highlightText = (element, terms, className) => {
    let text;
    terms.forEach(term => {
      text = term.toLowerCase()
    });
    const highlight = node => {
      const val = node.nodeValue;
      const pos = val.toLowerCase().indexOf(text);
      if (pos >= 0) {
        const span = document.createElement("mark");
        span.className = className;
        span.appendChild(document.createTextNode(val.substr(pos, text.length)));
        const next = document.createTextNode(val.substr(pos + text.length));
        node.parentNode.insertBefore(span, node.parentNode.insertBefore(next, node.nextSibling));
        node.nodeValue = val.substr(0, pos);
        highlight(next);
      }
    }
    if (!element.parentNode.matches("button, select, textarea")) highlight(element);
  };

  /**
   * highlight the search words provided in the url in the text
   */
  window.highlightSearchWords = () => {
    const params = getQueryParameters();
    const terms = (params.highlight) ? params.highlight[0].split(/\s+/) : [];
    const body = document.querySelector('.post-body');
    if (!terms.length || !body) return;
    const walk = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null, false);
    const allNodes = [];
    while (walk.nextNode()) {
      allNodes.push(walk.currentNode);
    }
    allNodes.forEach(node => {
      highlightText(node, terms, 'search-keyword');
    });
  };

  if (CONFIG.localsearch.preload) {
    fetchData();
  }

  if (CONFIG.localsearch.trigger === 'auto') {
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
      if (!isfetched) fetchData();
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
