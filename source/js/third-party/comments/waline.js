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
 * refresh Waline
 */
const waitToRun = (selector, action) => {
  let timeout = 30000;
  let start = Date.now();
  let getElem = (resolve, reject) => {
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
    setTimeout(getElem(resolve, reject), 500);
  }
  new Promise((resolve, reject) => {
    getElem(resolve, reject);
  }).then(action).catch(reson => console.log(reson));
}

const setPlachHolder = () => {
  //Set input placeholder.
  const metaPlaceholder = CONFIG.waline.metaPlaceholder;
  if (!metaPlaceholder) {
    return;
  }

  if (metaPlaceholder.nick) {
    waitToRun('.wl-header-item input.wl-nick', elem => elem.placeholder = metaPlaceholder.nick);
  }
  if (metaPlaceholder.mail) {
    waitToRun('.wl-header-item input.wl-mail', elem => elem.placeholder = metaPlaceholder.mail);
  }
  if (metaPlaceholder.link) {
    waitToRun('.wl-header-item input.wl-link', elem => elem.placeholder = metaPlaceholder.link);
  }
}

/**
 * Observe login button to reinitialize waline instance.
 */
const observeWaline = () => {
  let options = { childList: true };
  
  Waline.observer = new MutationObserver((mutationList) => {
    let check = node => {
      if (node.nodeName == "BUTTON" && node.className == "wl-btn") {
        initWaline();
        return true;
      }
      return false;
    }
    mutationList.forEach(nodes => {
      for (let node of nodes.addedNodes) {
        if (check(node)) return;
      }
      for (let node of nodes.removedNodes) {
        if (check(node)) return;
      }
    });
  });

  waitToRun(".wl-footer .wl-info", elem => {
    Waline.observer.disconnect();
    Waline.observer.observe(elem, options);
    setPlachHolder();
  });
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
  observeWaline();
}

document.addEventListener('page:loaded', () => {
  if (!CONFIG.page.comments) return;
  const utils = NexT.utils;
  utils.loadComments('.waline-container')
    .then(() => NexT.utils.getScript(CONFIG.waline.js, {
      condition: window.Waline
    }))
    .then(initWaline);
});
