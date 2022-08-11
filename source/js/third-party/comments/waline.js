/* global NexT, CONFIG, Waline */

if (!CONFIG.waline.emojis) {
  CONFIG.waline.emojis = [];
}

/**
 * Set waline emojis sources.
 */
const emojis = CONFIG.waline.emojis;
const vendor = CONFIG.waline.emojiCdn === 'jsdelivr' ?
    'https://cdn.jsdelivr.net/npm' : 'https://unpkg.com';

for (let item of CONFIG.waline.emoji) {
  switch (item) {
    case "alus":
      emojis.push(`${vendor}/@waline/emojis@1.0.1/alus`);
      break;
    case "bilibili":
      emojis.push(`${vendor}/@waline/emojis@1.0.1/bilibili`)
      break;
    case "qq":
      emojis.push(`${vendor}/@waline/emojis@1.0.1/qq`)
      break;
    case "tieba":
      emojis.push(`${vendor}/@waline/emojis@1.0.1/tieba`);
      break;
    case "twitter":
      emojis.push(`${vendor}/@waline/emojis@1.0.1/tw-emoji`);
      break;
    case "weibo":
      emojis.push(`${vendor}/@waline/emojis@1.0.1/weibo`);
      break;
    default:
      emojis.push(item);
  }
}

/**
 * initialize waline.
 */
 const initWaline = () => {
  if (Waline.instance) {
    Waline.instance.destroy();
  }
  Waline.instance = Waline.init({
    el: '#waline',
    serverURL: CONFIG.waline.serverURL,
    pageview: CONFIG.waline.pageview,
    comment: CONFIG.waline.comment,
    lang: CONFIG.waline.lang,
    meta: CONFIG.waline.meta,
    requiredMeta: CONFIG.waline.requiredMeta,
    login: CONFIG.waline.login,
    wordLimit: CONFIG.waline.wordLimit,
    pageSize: CONFIG.waline.pageSize,
    copyright: CONFIG.waline.copyright,
    emoji: CONFIG.waline.emojis
  });
}

/**
 * refresh Waline
 */
const observeWaline = () => {

  const waitToRun = (selector) => {
    timeout = 30000,
    start = Date.now();
    return new Promise((resolve, reject) => {
      let getElem = function () {
        // check timeout.
        if (Date.now() - start > timeout) {
          reject(`Query element '${selector}' timeout, 30s.`)
          return;
        }
        // query element
        let elem = document.querySelector(selector);
        if (elem) {
          resolve(elem);
          return;
        }
        setTimeout(getElem, 500);
      }
      getElem();
    });
  }

  // Observe login button to reinitialize waline instance.
  waitToRun(".wl-footer .wl-info").then(elem => {
    options = { childList: true };

    if (!Waline.observer) {
      Waline.observer = new MutationObserver((mutationList) => {
        let nodeAll = [];
        mutationList.forEach(nodes => {
          nodes.addedNodes.forEach(list => nodeAll = nodeAll.concat(list));
          nodes.removedNodes.forEach(list => nodeAll = nodeAll.concat(list));
        });
        for (let node of nodeAll) {
          if (node.nodeName != "BUTTON" || node.className != "wl-btn") {
            continue;
          }
          initWaline();
          observeWaline();
          return;
        }
      });
    }

    Waline.observer.disconnect();
    Waline.observer.observe(elem, options);
  }).catch(reson => console.log(reson));

  //Set input placeholder.
  const metaPlaceholder = CONFIG.waline.metaPlaceholder;
  if (!metaPlaceholder) {
    return;
  }
  if (metaPlaceholder.nick) {
    waitToRun('.wl-header-item input.wl-nick')
    .then(elem => elem.placeholder = metaPlaceholder.nick)
    .catch(reson => console.log(reson));
  }
  if (metaPlaceholder.mail) {
    waitToRun('.wl-header-item input.wl-mail')
    .then(elem => elem.placeholder = metaPlaceholder.mail)
    .catch(reson => console.log(reson));
  }
  if (metaPlaceholder.link) {
    waitToRun('.wl-header-item input.wl-link')
    .then(elem => elem.placeholder = metaPlaceholder.link)
    .catch(reson => console.log(reson));
  }
}

document.addEventListener('page:loaded', () => {
  if (!CONFIG.page.comments) return;

  NexT.utils.loadComments('.waline-container')
    .then(() => NexT.utils.getScript(CONFIG.waline.js, {
      condition: window.Waline
    }))
    .then(initWaline)
    .then(observeWaline);
});
